import { LightningElement, track, wire } from 'lwc';
import getContacts from '@salesforce/apex/contactController.getContacts';
import { createMessageContext, releaseMessageContext, publish, MessageContext} from 'lightning/messageService';
import DemoMC from "@salesforce/messageChannel/DemoMessageChannel__c";

export default class DemoPublisher extends LightningElement {
    // get MessageContext using createMessageContext()
    //context = createMessageContext();

    // get MessageContext using wire adapter 
    @wire(MessageContext) messageContext;
    @track contactList;

    connectedCallback(){
        getContacts()
            .then(result =>{
                this.contactList = result;
            })
            .catch(error=>{
                this.contactList = error;
            });
    }

    handleClick(event) {
        event.preventDefault();                
        const message = {
            recordId: event.target.dataset.value,
            recordData: { value: "Message from Lightning Web Component" }
        };
        publish(this.messageContext, DemoMC, message);
    }
}