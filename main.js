
import Model from './modules/Model.mjs';
import Controller from './modules/Controller.mjs';
import View from './modules/View.mjs';

const app = new Controller(new Model(), new View());
