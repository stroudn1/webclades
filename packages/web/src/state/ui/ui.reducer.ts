import { reducerWithInitialState } from 'typescript-fsa-reducers'

import { uiDefaultState } from 'src/state/ui/ui.state'

import immerCase from '../util/fsaImmerReducer'

import { setExportFormat, setShowInputBox } from './ui.actions'

export const uiReducer = reducerWithInitialState(uiDefaultState)
  .withHandling(
    immerCase(setShowInputBox, (draft, showInputBox) => {
      draft.showInputBox = showInputBox
    }),
  )

  .withHandling(
    immerCase(setExportFormat, (draft, exportFormat) => {
      draft.exportFormat = exportFormat
    }),
  )
