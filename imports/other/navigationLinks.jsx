//user
export const login = "/login";
export const editCurrentUser = "/user/edit/";

//notes
export const noteAdd = "/notes/add";
export const noteDetail = "/notes/:noteID";
export const noteEdit = "/notes/:noteID/edit";

//archives
export const archivedNotebooksList = "/archived/list";
export const archivedNotesList = "/archived/:notebookID/list";

//notebooks
export const notebookAdd = "/notebooks/add";
export const notesList = "/notebooks/:notebookID/list";
export const notebookEdit = "/notebooks/:notebookID/edit";

export const getLink = (address, arguments) => {
  if (arguments){
  const {notebookID, noteID} = arguments;
  switch (address) {
    case "login":
      return "/login";
      break;
    case "currentUserEdit":
      return "/user/edit";
      break;
    case "noteAdd":
      return "/notes/add";
      break;
    case "noteDetail":
      return `/notes/${noteID}`;
      break;
    case "noteEdit":
      return `/notes/${noteID}/edit`;
      break;
    case "archivedNotebooksList":
      return `/archived/list`;
      break;
    case "archivedNotesList":
      return `/archived/${notebookID}/list`;
      break;
    case "notebookAdd":
      return `/notebooks/add`;
      break;
    case "notesList":
      return `/notebooks/${notebookID}/list`;
      break;
    case "notebookEdit":
      return `/notebooks/${notebookID}/edit`;
      break;
    default:
      return `/notebooks/all-notebooks/list`;
      break;
    }
  }
  switch (address) {
    case "login":
      return "/login";
      break;
    case "currentUserEdit":
      return "/user/edit";
      break;
    case "noteAdd":
      return "/notes/add";
      break;
    case "noteDetail":
      return `/notes/:noteID`;
      break;
    case "noteEdit":
      return `/notes/:noteID/edit`;
      break;
    case "archivedNotebooksList":
      return `/archived/list`;
      break;
    case "archivedNotesList":
      return `/archived/:notebookID/list`;
      break;
    case "notebookAdd":
      return `/notebooks/add`;
      break;
    case "notesList":
      return `/notebooks/:notebookID/list`;
      break;
    case "notebookEdit":
      return `/notebooks/:notebookID/edit`;
      break;
    default:
      return `/notebooks/all-notebooks/list`;
      break;
    }
}
