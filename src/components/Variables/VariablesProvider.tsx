import { createContext, useState, ReactNode, useEffect, useRef } from "react"
import {
  ThemeType,
  ObservationType,
  InstrumentType,
  TargetType,
  VariablesContextType,
  ObservationInput,
  ConfigurationType,
  RotatorType,
} from "../../types"
import {
  useGetSelectedConfiguration,
  useUpdateSelectedConfiguration,
} from "../../gql/configs/SelectedConfiguration"
import { useUpsertObservation } from "../../gql/configs/Observation"
import {
  useCreateConfiguration,
  useUpdateConfiguration,
} from "../../gql/configs/Configuration"

export const VariablesContext = createContext<VariablesContextType>(null!)

export default function VariablesProvider({
  children,
}: {
  children: ReactNode
}) {
  // ---------- Apollo - Graphql Calls ----------
  // Queries
  const selectedConfiguration = useGetSelectedConfiguration()
  // Mutations
  const upsertObservation = useUpsertObservation()
  const createConfiguration = useCreateConfiguration()
  const updateConfiguration = useUpdateConfiguration()
  const updateSelectedConfiguration = useUpdateSelectedConfiguration()

  // ------------------ Theme ------------------
  const [theme, setTheme] = useState<ThemeType>("dark")
  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Re-render on theme change
  useEffect(() => {
    document.body.classList.value = theme
  }, [theme])

  // ----------- Guide Targets -----------------
  const [loadingGuideTarget, setLoadingGuideTarget] = useState(false)

  // --------- Local db Config ------------------
  const [isConfigModified, setIsConfigModified] = useState(false)
  const [isConfigModalVisible, setIsConfigModalVisible] = useState(false)
  const [configuration, setConfiguration] = useState<ConfigurationType>(
    {} as ConfigurationType
  )
  const [observation, setObservation] = useState<ObservationType>(
    {} as ObservationType
  )
  const [instrument, setInstrument] = useState<InstrumentType>(
    {} as InstrumentType
  )
  const [rotator, setRotator] = useState<RotatorType>({} as RotatorType)

  function updateOdbObservation({ id, name, targets }: ObservationInput) {
    if (id !== observation.id) {
      if (!isConfigModified) setIsConfigModified(true)
    }
    upsertObservation({
      variables: { id, name, targets },
      onCompleted(data) {
        setObservation(data.updateObservation)
      },
    })
  }

  function updateInstrument(newInstrument: InstrumentType) {
    if (newInstrument.pk !== instrument.pk) {
      if (!isConfigModified) setIsConfigModified(true)
    }
    if (JSON.stringify(newInstrument) !== JSON.stringify(instrument)) {
    }
  }

  function saveConfiguration(type: "save" | "create") {
    switch (type) {
      case "save":
        updateConfiguration({
          variables: {
            pk: selectedConfiguration.configuration.pk,
            name: configuration.name,
            observationPk: observation.pk,
            instrumentPk: instrument.pk,
          },
          onCompleted(data) {
            setIsConfigModalVisible(false)
            setIsConfigModified(false)
          },
        })
        break

      case "create":
        createConfiguration({
          variables: {
            name: configuration.name,
            observationPk: observation.pk,
            instrumentPk: instrument.pk,
          },
          onCompleted(data) {
            updateSelectedConfiguration({
              variables: {
                pk: selectedConfiguration.pk,
                configurationPk: data.createConfiguration.pk,
              },
              update(c2, r2) {
                setIsConfigModalVisible(false)
                setIsConfigModified(false)
              },
            })
          },
        })
        break

      default:
        break
    }
  }

  useEffect(() => {
    if (selectedConfiguration.configuration) {
      setConfiguration(selectedConfiguration.configuration)
    }
    if (selectedConfiguration.configuration?.observation) {
      setObservation(
        selectedConfiguration.configuration.observation as ObservationType
      )
    }
    if (selectedConfiguration.configuration?.instrument) {
      setInstrument(
        selectedConfiguration.configuration.instrument as InstrumentType
      )
    }
    if (selectedConfiguration.configuration?.rotator) {
      setRotator(selectedConfiguration.configuration.rotator as RotatorType)
    }
  }, [selectedConfiguration])

  // SELECTED TARGET
  let selectedTarget =
    observation.targets?.filter(
      (tgt) => tgt.pk === observation.selectedTarget
    )[0] ?? ({} as TargetType)

  let value = {
    theme,
    toggleTheme,
    observation,
    setObservation,
    updateOdbObservation,
    instrument,
    setInstrument,
    updateInstrument,
    rotator,
    setRotator,
    isConfigModified,
    saveConfiguration,
    selectedTarget,
    isConfigModalVisible,
    setIsConfigModalVisible,
    configuration,
    setConfiguration,
    loadingGuideTarget,
    setLoadingGuideTarget,
  }

  return (
    <VariablesContext.Provider value={value}>
      {children}
    </VariablesContext.Provider>
  )
}
