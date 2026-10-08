import {competitions,products,demoEntries} from './data.js';
// Read-only demo boundary. Future authenticated server APIs replace this adapter.
// No credentials, checkout, ticket allocation or write operations exist here.
export const demoService = Object.freeze({
 listCompetitions:()=>competitions,
 getCompetition:id=>competitions.find(c=>c.id===id),
 listProducts:()=>products,
 getEntries:()=>demoEntries
});
