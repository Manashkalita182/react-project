
import { Client, Account, ID } from "appwrite";
import conf from "../conf/Conf";


export class AuthService {
    client= new Client();
    account;

    constructor(){
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('664f9d00001cbe9d6514') ;   //project id  
    this.account = new Account(this.client);       
    }
    async createAccount ({ email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password , name);
            if (userAccount){
                return this.login({ email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            if (error.code === 409) {
                console.error('Account creation failed: Email already in use');
                throw new Error('Email already in use');
            } else {
                console.error('Account creation failed:', error.message);
            throw error;
        }
            
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log('Current user:', user);
            return user;
        } catch (error) {
            console.error('Appwrite service :: getCurrentUser :: error', error.message);
            throw error;
        }
    
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService
