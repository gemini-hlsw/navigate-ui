import { VariablesContext } from "../../Variables/VariablesProvider"
import { useGetGuideTargets } from "../../../gql/odb/Observation"
import { useCreateGuideProbe } from "../../../gql/configs/GuideProbe"
import { TargetInput } from "../../../types"
import { useContext } from "react"
import { Button } from "primereact/button"

export function UpdateGuideTargets({ canEdit }: { canEdit: boolean }) {
  const { observation, setObservation, setLoadingGuideTarget } =
    useContext(VariablesContext)
  const getGuideTargets = useGetGuideTargets()
  const createGuideProbe = useCreateGuideProbe()

  function calculateGuideTargets() {
    setLoadingGuideTarget(true)
    let crtTime = new Date().toISOString()
    console.log(`observation: ${JSON.stringify(observation)}\ntime: ${crtTime}`)
    getGuideTargets({
      variables: {
        observationId: observation.id,
        observationTime: crtTime,
      },
      onCompleted(data) {
        console.log(data)
        let probeName =
          data.observation.targetEnvironment.guideEnvironment.guideTargets[0]
            .probe
        let targets: TargetInput[] = []
        data.observation.targetEnvironment.guideEnvironment.guideTargets.map(
          (t: any) => {
            targets.push({
              name: t.name,
              id: undefined,
              type: "GUIDE",
              epoch: t.sidereal.epoch,
              ra: t.sidereal.ra.degrees,
              dec: t.sidereal.dec.degrees,
            })
          }
        )
        let probe = "NONE"
        if (probeName.includes("OIWFS")) probe = "OIWFS"
        else if (probeName.includes("PWFS1")) probe = "PWFS1"
        else if (probeName.includes("PWFS2")) probe = "PWFS2"
        createGuideProbe({
          variables: {
            probe: probe,
            selectedTarget: undefined,
            observationPk: observation.pk,
            targets: targets,
          },
          onCompleted(res) {
            console.log(res)
            setObservation({
              ...observation,
              guideProbes: [res.createGuideProbe],
            })
            setLoadingGuideTarget(false)
          },
        })
      },
      onError(err) {
        console.log(err)
      },
    })
    console.log("done")
  }

  return (
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
  )
}
