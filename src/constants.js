export const API_URL = import.meta.env.VITE_API;
export const JWT_KEY = "USER_JWT";
export const HOME_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const PROFILE_ROUTE = "/profile";
export const UNAUTHORIZED_ROUTE = "/unauthorized";
export const CREATE_ROUTE = "/pastes/create";
export const SHOW_PASTE_ROUTE = "/pastes/:id";
export const EDIT_PASTE_ROUTE = "/pastes/:id/edit";
export const NOT_FOUND_ROUTE = "/404";
export const MY_PASTES_ROUTE = "/pastes/me";
export const USER_PASTES_ROUTE = "/pastes/user/:id";
export const STARGAZERS_ROUTE = "/pastes/:id/stargazers";
export const LANG_LIST = [["plaintext", "Text"], ["bash", "Bash"], ["c", "C"], ["cpp", "C++"], ["csharp", "C#"], ["css", "CSS"], ["markdown", "Markdown"], ["dart", "Dart"], ["elixir", "Elixir"], ["ruby", "Ruby"], ["go", "Golang"], ["graphql", "GraphQL"], ["html", "HTML"], ["java", "Java"], ["javascript", "Javascript"], ["json", "JSON"], ["kotlin", "Kotlin"], ["php", "PHP"], ["powershell", "Powershell"], ["python", "Python"], ["rust", "Rust"], ["sql", "SQL"], ["swift", "Swift"], ["yaml", "YAML"], ["typescript", "Typescript"], ["xml", "XML"]];
export const LANG_EXTENSIONS = {
    ".txt": "plaintext",
    ".sh": "bash",
    ".c": "c",
    ".cpp": "cpp",
    ".cs": "csharp",
    ".css": "css",
    ".md": "markdown",
    ".dart": "dart",
    ".ex": "elixir",
    ".rb": "ruby",
    ".go": "go",
    ".graphql": "graphql",
    ".html": "html",
    ".java": "java",
    ".js": "javascript",
    ".json": "json",
    ".kt": "kotlin",
    ".php": "php",
    ".ps1": "powershell",
    ".py": "python",
    ".rs": "rust",
    ".sql": "sql",
    ".swift": "swift",
    ".yaml": "yaml",
    ".ts": "typescript",
    ".xml": "xml"
};