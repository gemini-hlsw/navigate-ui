import { Splitter, SplitterPanel } from "primereact/splitter";

export default function Home() {
  return (
    <Splitter className="h-100">
      <SplitterPanel>
          Telescope
      </SplitterPanel>
      <SplitterPanel>
          Wavefront Sensors
      </SplitterPanel>
      <SplitterPanel>
          Guider
      </SplitterPanel>
    </Splitter>
  )
}