import React from "react";
import { Splitter, SplitterPanel } from "primereact/splitter";

export default function Home() {
  return (
    <Splitter className="w-100">
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