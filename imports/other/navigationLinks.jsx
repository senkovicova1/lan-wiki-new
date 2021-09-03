//user
export const login = "/login";
export const editCurrentUser = "/user/edit/";

//notes
export const noteAdd = "/:notebookID/:tagID/notes/add";
export const noteDetail = "/:notebookID/:tagID/notes/:noteID/view";
export const noteEdit = "/:notebookID/:tagID/notes/:noteID/edit";

//archives
export const archivedNotebooksList = "/archived/list";
export const archivedNotesList = "/archived/:notebookID";

//notebooks
export const notebookAdd = "/:notebookID/:tagID/add";
export const notesList = "/:notebookID/:tagID/list";
export const notebookEdit = "/:notebookID/:tagID/edit";

//users
export const usersList = "/users/list";

export const getLink = (address, arguments) => {
  switch (address) {
    case "login":
      return "/login";
      break;
    case "currentUserEdit":
      return "/user/edit";
      break;
    case "noteAdd":
      return "/:notebookID/:tagID/notes/add";
      break;
    case "noteDetail":
      return `/:notebookID/:tagID/notes/:noteID/view`;
      break;
    case "noteEdit":
      return `/:notebookID/:tagID/notes/:noteID/edit`;
      break;
    case "archivedNotebooksList":
      return `/archived/list`;
      break;
    case "archivedNotesList":
      return `/archived/:notebookID`;
      break;
    case "notebookAdd":
      return `/:notebookID/:tagID/add`;
      break;
    case "notesList":
      return `/:notebookID/:tagID/list`;
      break;
    case "notebookEdit":
      return `/:notebookID/:tagID/edit`;
      break;
    case "usersList":
      return `/users/list`;
      break;
    default:
      return `/all-notebooks/all-tags/list`;
      break;
    }
}

export const getGoToLink = (address, arguments) => {
    const {notebookID, noteID, tagID} = arguments ? arguments : {};
  switch (address) {
    case "login":
      return "/login";
      break;
    case "currentUserEdit":
      return "/user/edit";
      break;
    case "noteAdd":
      return `/${notebookID}/${tagID}/notes/add`;
      break;
    case "noteDetail":
      return `/${notebookID}/${tagID}/notes/${noteID}/view`;
      break;
    case "noteEdit":
      return `/${notebookID}/${tagID}/notes/${noteID}/edit`;
      break;
    case "archivedNotebooksList":
      return `/archived/list`;
      break;
    case "archivedNotesList":
      return `/archived/${notebookID}`;
      break;
    case "notebookAdd":
      return `/${notebookID}/${tagID}/add`;
      break;
    case "notesList":
      return `/${notebookID}/${tagID}/list`;
      break;
    case "notebookEdit":
      return `/${notebookID}/${tagID}/edit`;
      break;
    case "usersList":
      return `/users/list`;
      break;
    default:
      return `/all-notebooks/all-tags/list`;
      break;
    }
}
