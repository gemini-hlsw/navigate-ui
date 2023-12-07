import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest"
import { render, fireEvent, cleanup, screen } from "@testing-library/react"
import { Title } from "./Title"

describe('Title test with args', () => {
  let title = "My title"
  const nextPanelObject = {
    nextPanel: () => {}
  }
  
  const prevPanelObject = {
    prevPanel: () => {}
  }
  
  const nextPanelFunction = vi.spyOn(nextPanelObject, 'nextPanel')
  const prevPanelFunction = vi.spyOn(prevPanelObject, 'prevPanel')
  
  let container: any = null
  beforeAll(() => {
    ({ container } = render(
      <Title
        title={title}
        prevPanel={prevPanelObject.prevPanel}
        nextPanel={nextPanelObject.nextPanel}
      >
        <h3>Hola</h3>
      </Title>
    ))
  })

  afterAll(() => {
    cleanup()
  })

  it('sholud show title', () => {
    expect(screen.getByText(title)).toBeDefined()
  })

  it('should have prev and next panel buttons', () => {
    expect(container.getElementsByClassName("p-panel").length).toBe(1)
    expect(container.getElementsByClassName("n-panel").length).toBe(1)
  })

  it('should show children', () => {
    expect(screen.getByText('Hola')).toBeDefined()
  })

  it('functions should be called', () => {
    fireEvent(
      container.getElementsByClassName("n-panel")[0], 
      new MouseEvent('click', { bubbles: true })
    )

    fireEvent(
      container.getElementsByClassName("p-panel")[0], 
      new MouseEvent('click', { bubbles: true })
    )
    expect(nextPanelFunction).toHaveBeenCalledTimes(1)
    expect(prevPanelFunction).toHaveBeenCalledTimes(1)
  })
})

describe('Title test with args', () => {
  let title = "My title"

  const nextPanel = () => {}
  const prevPanel = () => {}

  const nextPanelMock = vi.fn().mockImplementation(nextPanel)
  const prevPanelMock = vi.fn().mockImplementation(prevPanel)

  it('functions should be called', () => {
    let {container} = render(
      <Title
        title={title}
        prevPanel={prevPanelMock}
        nextPanel={nextPanelMock}
      >
        <h3>Hola</h3>
      </Title>
    )
    fireEvent(
      container.getElementsByClassName("n-panel")[0], 
      new MouseEvent('click', { bubbles: true })
    )

    fireEvent(
      container.getElementsByClassName("p-panel")[0], 
      new MouseEvent('click', { bubbles: true })
    )
    expect(nextPanelMock).toHaveBeenCalledTimes(1)
    expect(prevPanelMock).toHaveBeenCalledTimes(1)
    cleanup()
  })
})

describe('Title test without args', () => {
  let title = "My title"

  it('sholud show title', () => {
    let { container } = render(
      <Title
        title={title}
      >
      </Title>
    )

    expect(screen.getByText(title)).toBeDefined()
    cleanup()
  })

  it('should not have prev and next panel button if no functions are defined', () => {
    let { container } = render(
      <Title
        title={title}
      >
      </Title>
    )
    expect(container.getElementsByClassName("p-panel").length).toBe(0)
    expect(container.getElementsByClassName("n-panel").length).toBe(0)
    cleanup()
  })

  it('should not show children neither buttons if not defined', () => {
    let { container } = render(
      <Title
        title={title}
      >
      </Title>
    )
    expect(container.firstChild?.childNodes.length).toBe(1)
    cleanup()
  })
})

describe('Title with children', () => {
  let title = "My title"
  
  const CHILDREN = Math.floor(Math.random() * 10);
  let children: JSX.Element[] = []
  for (let i = 0; i < CHILDREN; i++) {
    children.push(<span key={i}>node {i}</span>)
  }

  it('should render title plus children created', () => {
    let instance = render(
      <Title title={title}>
        {children}
      </Title>
    )
    expect(instance.container.firstChild?.childNodes.length).toBe(CHILDREN + 1)
    cleanup()
  })
})