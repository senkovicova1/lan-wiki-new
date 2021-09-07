//users
export const login = "/login";
export const editCurrentUser = "/users/edit-profile";
export const usersList = "/users/list";

//notebooks
export const notebooksList = ["/", "/notebooks"];
export const notesInNotebook = "/notebooks/:notebookID/notes";
export const notebookEdit = "/notebooks/:notebookID/edit";
export const notebookAdd = "/notebooks/add";

//tags
export const tagsList = "/tags";
export const notesWithTag = "/tags/:tagID/notes";

//notes
export const noteAdd = "/:filterType/notes/add";
export const noteDetail = "/:filterType/notes/:noteID/view";
export const noteEdit = "/:filterType/notes/:noteID/edit";

//archives
export const archivedNotebooksList = "/archived";
export const archivedNotesList = "/archived/:notebookID";
export const archivedNoteDetail = "/archived/:notebookID/:noteID";


export const getLink = (address, arguments) => {
  switch (address) {
    case "login":
      return "/login";
      break;
    case "currentUserEdit":
      return "/users/edit-profile";
      break;
    case "usersList":
      return `/users/list`;
      break;
    case "notebooksList":
      return ["/", "/notebooks"];
      break;
    case "notesInNotebook":
      return `/notebooks/:notebookID/notes`;
      break;
    case "notebookEdit":
      return `/notebooks/:notebookID/edit`;
      break;
    case "notebookAdd":
      return `/notebooks/add`;
      break;
    case "tagsList":
      return "/tags";
      break;
    case "notesWithTag":
      return `/tags/:tagID`;
      break;
    case "noteAdd":
      return "/:filterType/notes/add";
      break;
    case "noteDetail":
      return `/:filterType/notes/:noteID/view`;
      break;
    case "noteEdit":
      return `/:filterType/notes/:noteID/edit`;
      break;
    case "archivedNotebooksList":
      return `/archived`;
      break;
    case "archivedNotesList":
      return `/archived/:notebookID`;
      break;
    case "archivedNoteDetail":
      return `/archived/:notebookID/:noteID`;
      break;
    default:
      return `/`;
      break;
    }
}

export const getGoToLink = (address, arguments) => {
    const {notebookID, noteID, tagID, filterType} = arguments ? arguments : {};
  switch (address) {
    case "login":
      return "/login";
      break;
    case "currentUserEdit":
      return "/users/edit-profile";
      break;
    case "usersList":
      return `/users/list`;
      break;
    case "notebooksList":
      return "/notebooks";
      break;
    case "notesInNotebook":
      return `/notebooks/${notebookID}/notes`;
      break;
    case "notebookEdit":
      return `/notebooks/${notebookID}/edit`;
      break;
    case "notebookAdd":
      return `/notebooks/add`;
      break;
    case "tagsList":
      return "/tags";
      break;
    case "notesWithTag":
      return `/tags/${tagID}`;
      break;
    case "noteAdd":
      return `/${filterType}/notes/add`;
      break;
    case "noteDetail":
      return `/${filterType}/notes/${noteID}/view`;
      break;
    case "noteEdit":
      return `/${filterType}/notes/${noteID}/edit`;
      break;
    case "archivedNotebooksList":
      return `/archived`;
      break;
    case "archivedNotesList":
      return `/archived/${notebookID}`;
      break;
    case "archivedNoteDetail":
      return `/archived/${notebookID}/${noteID}`;
      break;
    default:
      return `/`;
      break;
    }
}
