val root = project
  .in(file("."))
  .settings(
    name := "navigate-ui",
    description := "Navigate UI dist files",
    // drop off Scala suffix from artifact names.
    crossPaths := false,
    // exclude scala-library from dependencies
    autoScalaLibrary := false,
    Compile / resourceDirectory := baseDirectory.value / "dist"
  )

inThisBuild(
  tlBaseVersion := "0.1"
)
