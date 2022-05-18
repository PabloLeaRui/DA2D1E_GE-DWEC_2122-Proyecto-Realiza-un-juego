import Constants from "../constants";

export default class DatabaseManager{
    public data: any;

    constructor(){
        if (JSON.parse(localStorage.getItem(Constants.DATABASE.NAME))){
            this.data = JSON.parse(localStorage.getItem(Constants.DATABASE.NAME));
        }else{
            this.createDB();
        }
    }

    private createDB(){
        let initDB = {
            music: true,
            effects: true,
            scores: {
                level1: 0
            }
        }

        this.data = initDB;
        localStorage.setItem(Constants.DATABASE.NAME, JSON.stringify(this.data));
    }

    public saveDB(){
        localStorage.setItem(Constants.DATABASE.NAME, JSON.stringify(this.data));
    }
}