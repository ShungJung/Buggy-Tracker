import { Issue } from "types";
import "../style/project.css";
import { appWindow } from "../../node_modules/@tauri-apps/api/window";
import { invoke } from "../../node_modules/@tauri-apps/api/tauri";

const searchBar = document.getElementById("search-bar") as HTMLInputElement
const list = document.getElementById("list")
const baseItem = document.getElementById("base-item")
const createIssue = document.getElementById("create-issue") as HTMLAnchorElement

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

async function project() {
  
  try {
    appWindow.setTitle("Buggy Tracker")

    const issues: Issue[] = await invoke('read_issue', { project: params.name });
    
    createIssue.setAttribute('href', `/createIssue.html?name=${params.name}`)
    
    issues.forEach((issue, index) => {
      const clone = baseItem.cloneNode(true) as HTMLDivElement
      clone.id = index.toString()
  
      list.appendChild(clone)
  
      const title = document.getElementsByClassName("title")[index] as HTMLElement
      const link = document.getElementsByClassName("link")[index] as HTMLElement
      const deleteButton = document.getElementsByClassName("delete-button")[index] as HTMLButtonElement
      const editButton = document.getElementsByClassName("edit-button")[index] as HTMLButtonElement
  
      title.innerText = issue.title
  
      link.setAttribute("href", `./issue.html?id=${index}&name=${params.name}`)
  
      deleteButton.addEventListener("click", async e => {
        try {
          await invoke("delete_issue", { id: index, project: params.name })
          location.reload();
        } catch (error) {
          console.error(error)
        }
      })
  
      editButton.addEventListener("click", e => {
        const editForm = document.getElementsByClassName("edit-form")[index] as HTMLFormElement
        editForm.hidden = false
  
        const editTitle = document.getElementsByClassName("edit-title")[index] as HTMLInputElement
        const editDesc = document.getElementsByClassName("edit-desc")[index] as HTMLInputElement
  
        editForm.addEventListener("submit", async e => {
          try {
            await invoke('update_issue', {
              title: editTitle.value, 
              description: editDesc.value,
              id: index,
              project: params.name
            })
            location.reload();
          } catch (error) {
            console.error(error)
          }
        })
      })
  
      clone.hidden = false
    });
  } catch (error) {
    console.log(error)
  }  
}

project()