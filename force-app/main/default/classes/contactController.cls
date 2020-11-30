public with sharing class contactController {
    public String contactId {get;set;}
    public Contact cnt {get;set;}

    public contactController() {
        cnt = new Contact();
    }


    @AuraEnabled(cacheable=true)    
    public static List<Contact> getContacts(){
        return [select Id, Name, Email, MobilePhone, AccountId from Contact ORDER BY Name DESC limit 10];
    }

    @AuraEnabled
    public static List<Contact> getContactRecordsList(){
        return [select Id, Name, Email, MobilePhone, AccountId from Contact limit 10];
    }
    public pageReference getContactDetail(){
        if(contactId != null){
            cnt = [select Id, Name, Email, MobilePhone, AccountId from Contact where id =: contactId];
            
        }       
		return null;        
    }
}
