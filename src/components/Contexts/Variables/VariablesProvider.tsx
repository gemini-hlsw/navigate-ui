import { createContext, useState, ReactNode, useEffect, useRef } from "react"
import {
  ThemeType,
  TargetType,
  VariablesContextType,
  ConfigurationType,
  SlewFlagsType,
  ConfigurationChangesType,
  ObservationType,
  TargetEditType,
} from "@/types"
import {
  useGetSelectedConfiguration,
  useUpdateSelectedConfiguration,
} from "@gql/configs/SelectedConfiguration"
import {
  useCreateConfiguration,
  useUpdateConfiguration,
} from "@gql/configs/Configuration"
import { diff } from "just-diff"
import { Modals } from "./Modals/Modals"

export const VariablesContext = createContext<VariablesContextType>(null!)

export default function VariablesProvider({
  children,
}: {
  children: ReactNode
}) {
  // ---------- Apollo - Graphql Calls ----------
  // Queries
  const selectedConfiguration = useGetSelectedConfiguration()
  const [storedConfiguration, setStoredConfiguration] =
    useState<ConfigurationType>(selectedConfiguration.configuration ?? {})
  // Mutations
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

  // ------------------ Modals -----------------
  const [odbVisible, setOdbVisible] = useState(false)
  const [targetEdit, setTargetEdit] = useState<TargetEditType>({
    isVisible: false,
    target: {} as TargetType,
    targetIndex: undefined,
    probeIndex: undefined,
  })
  const [slewVisible, setSlewVisible] = useState(false)
  const [importInstrument, setImportInstrument] = useState(false)
  const [slewFlags, setSlewFlags] = useState<SlewFlagsType>({
    zeroChopThrow: false,
    zeroSourceOffset: false,
    zeroSourceDiffTrack: false,
    zeroMountOffset: false,
    zeroMountDiffTrack: false,
    shortcircuitTargetFilter: false,
    shortcircuitMountFilter: false,
    resetPointing: false,
    stopGuide: false,
    zeroGuideOffset: false,
    zeroInstrumentOffset: false,
    autoparkPwfs1: false,
    autoparkPwfs2: false,
    autoparkOiwfs: false,
    autoparkGems: false,
    autoparkAowfs: false,
  } as SlewFlagsType)

  // ----------- Guide Targets -----------------
  const [loadingGuideTarget, setLoadingGuideTarget] = useState(false)

  // --------- Local db Config ------------------
  const [isConfigModalVisible, setIsConfigModalVisible] = useState(false)
  const [configuration, setConfiguration] = useState<ConfigurationType>(
    {} as ConfigurationType
  )
  const [configurationChanges, setConfigurationChanges] =
    useState<ConfigurationChangesType[]>()

  function setOdbObservation(observation: ObservationType) {
    setStoredConfiguration({
      ...storedConfiguration,
      observation: {
        ...(storedConfiguration.observation ?? ({} as ObservationType)),
        guideProbes: observation.guideProbes,
        targets: observation.targets,
      },
    } as ConfigurationType)
    setConfiguration({
      ...configuration,
      observation: observation,
    })
  }

  function saveConfiguration(type: "save" | "create") {
    switch (type) {
      case "save":
        updateConfiguration({
          variables: {
            pk: selectedConfiguration.configuration.pk,
            name: configuration.name,
            observationPk: configuration.observation?.pk,
            instrumentPk: configuration.instrument?.pk,
          },
          onCompleted(data) {
            setIsConfigModalVisible(false)
          },
        })
        break

      case "create":
        createConfiguration({
          variables: {
            name: configuration.name,
            observationPk: configuration.observation?.pk,
            instrumentPk: configuration.instrument?.pk,
          },
          onCompleted(data) {
            updateSelectedConfiguration({
              variables: {
                pk: selectedConfiguration.pk,
                configurationPk: data.createConfiguration.pk,
              },
              update(c2, r2) {
                setIsConfigModalVisible(false)
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
      setStoredConfiguration(selectedConfiguration.configuration)
    }
  }, [selectedConfiguration])

  useEffect(() => {
    setConfigurationChanges(
      diff(storedConfiguration as ConfigurationType, configuration)
    )
  }, [configuration])

  // useEffect(() => {
  //   console.log(configurationChanges)
  // }, [configurationChanges])

  // SELECTED TARGET
  let selectedTarget =
    configuration.observation?.targets?.filter(
      (tgt) => tgt.pk === configuration.observation?.selectedTarget
    )[0] ?? ({} as TargetType)

  let value = {
    theme,
    toggleTheme,
    odbVisible,
    setOdbVisible,
    setOdbObservation,
    slewVisible,
    setSlewVisible,
    slewFlags,
    setSlewFlags,
    targetEdit,
    setTargetEdit,
    importInstrument,
    setImportInstrument,
    saveConfiguration,
    selectedTarget,
    isConfigModalVisible,
    setIsConfigModalVisible,
    configuration,
    setConfiguration,
    configurationChanges,
    loadingGuideTarget,
    setLoadingGuideTarget,
  }

  return (
    <VariablesContext.Provider value={value}>
      <Modals />
      {children}
    </VariablesContext.Provider>
  )
}
