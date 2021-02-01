
export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findSwatch = (swatches=[], swatchId) =>
  swatches.find(swatch => swatch.id === swatchId)

export const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folder === folderId)
)

export const countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folder === folderId).length