import React from 'react'

export type Step = {
  on: boolean
}

export const newStep = (): Step => ({
  on: false
})

export type Track = {
  name: string
  steps: Array<Step>
}

export const newTrack = (size: number): Track => ({
  name: 'New Track',
  steps: Array(size).fill(newStep())
})

export type Project = {
  name: string
  tracks: Array<Track>
}

export const emptyProject = (): Project => ({
  name: 'New Project',
  tracks: [newTrack(8)]
})

let project: Project = emptyProject()

export const useProject = (): Project => {
  return project
}

export const setProject = (f: (p: Project) => Project): void => {
  project = f(project)
}