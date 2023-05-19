import './style.css';
import {Todo} from "/src/model.js"
import {mainPage} from "/src/dom.js"
import {Project} from "/src/model.js"
import { createProjectDom } from './dom';
import { myProjectManager } from './projectManager';
import { format } from 'date-fns/esm';
import { setProjects } from './localStorage';
import{getProjects} from './localStorage';
import { createProjectDomButton } from './dom';
import { selectTodo } from './todosDom';
import { createProject } from './projects';
import { displayAllProjects } from './dom';
mainPage()
createProjectDomButton()
getProjects()
displayAllProjects()
selectTodo()