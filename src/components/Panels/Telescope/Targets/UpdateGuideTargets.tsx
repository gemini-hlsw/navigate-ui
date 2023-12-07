import { VariablesContext } from "@Contexts/Variables/VariablesProvider"
import { useGetGuideTargets } from "@gql/odb/Observation"
import { useCreateGuideProbe } from "@gql/configs/GuideProbe"
import { ObservationType, TargetInput } from "@/types"
import { useContext, useRef } from "react"
import { Button } from "primereact/button"
import { Toast } from "primereact/toast"

export function UpdateGuideTargets({ canEdit }: { canEdit: boolean }) {
  const { configuration, setConfiguration, setLoadingGuideTarget } =
    useContext(VariablesContext)
  const getGuideTargets = useGetGuideTargets()
  const createGuideProbe = useCreateGuideProbe()
  const toast = useRef<Toast>(null)

  function calculateGuideTargets() {
    setLoadingGuideTarget(true)
    let crtTime = new Date().toISOString()
    getGuideTargets({
      variables: {
        observationId: configuration.observation?.id,
        observationTime: crtTime,
      },
      onCompleted(data) {
        let OiwfsTargets: TargetInput[] = []
        let Pwfs1Targets: TargetInput[] = []
        let Pwfs2Targets: TargetInput[] = []
        data.observation.targetEnvironment.guideEnvironments.map((env: any) => {
          env.guideTargets.map((t: any) => {
            let auxTarget: TargetInput = {
              name: t.name,
              id: undefined,
              type: "GUIDE",
              epoch: t.sidereal.epoch,
              ra: t.sidereal.ra.degrees,
              dec: t.sidereal.dec.degrees,
            }
            if (t.probe.includes("OIWFS")) {
              OiwfsTargets.push(auxTarget)
            } else if (t.probe.includes("PWFS1")) {
              Pwfs1Targets.push(auxTarget)
            } else if (t.probe.includes("PWFS2")) {
              Pwfs2Targets.push(auxTarget)
            }
          })
        })

        if (OiwfsTargets.length > 0) {
          createGuideProbe({
            variables: {
              probe: "OIWFS",
              selectedTarget: undefined,
              observationPk: configuration.observation?.pk,
              targets: OiwfsTargets,
            },
            onCompleted(res) {
              console.log(res)
              setConfiguration({
                ...configuration,
                observation: {
                  ...(configuration.observation ?? ({} as ObservationType)),
                  guideProbes: [res.createGuideProbe],
                },
              })
            },
          })
        }

        if (Pwfs1Targets.length > 0) {
          createGuideProbe({
            variables: {
              probe: "PWFS1",
              selectedTarget: undefined,
              observationPk: configuration.observation?.pk,
              targets: Pwfs1Targets,
            },
            onCompleted(res) {
              setConfiguration({
                ...configuration,
                observation: {
                  ...(configuration.observation ?? ({} as ObservationType)),
                  guideProbes: [res.createGuideProbe],
                },
              })
            },
          })
        }

        if (Pwfs2Targets.length > 0) {
          createGuideProbe({
            variables: {
              probe: "PWFS2",
              selectedTarget: undefined,
              observationPk: configuration.observation?.pk,
              targets: Pwfs2Targets,
            },
            onCompleted(res) {
              setConfiguration({
                ...configuration,
                observation: {
                  ...(configuration.observation ?? ({} as ObservationType)),
                  guideProbes: [res.createGuideProbe],
                },
              })
            },
          })
        }

        setLoadingGuideTarget(false)
      },
      onError(err) {
        setLoadingGuideTarget(false)
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: err.toString(),
          life: 5000,
        })
        console.log(err)
      },
    })
  }

  return (
    <>
      <Toast ref={toast} />
      <Button
        disabled={!canEdit}
        className="absolute-right-btn"
        tooltip="Get current guide targets"
        tooltipOptions={{ position: "bottom" }}
        icon="pi pi-refresh"
        iconPos="right"
        label=""
        onClick={calculateGuideTargets}
      />
    </>
  )
}
