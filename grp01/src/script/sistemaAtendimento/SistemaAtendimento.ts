function convertIntergerDigits(number=0) {
    if (number) 
        return Number(number).toLocaleString('pt-br',{minimumIntegerDigits: 2,useGrouping: false})
    return null   
}

function worstTimePerTicket(typeTicket="") {
    switch (typeTicket) {
        case "SG":
            return 3

        case "SE":
            return 1
        
        case "SP":
            return 5           
    
        default:
            return 0
    }    
}

export default class SistemaAtendimento {
    public filaEspera:Array<string> = []
    public filaAtendimento:Array<string> = [] 
    public quantitySP = 0
    public quantitySG = 0
    public quantitySE = 0
    public currentTicket = ""
    public yourTicket = ""
    public lastTypeTicket = ""
    public excededTime = false
    public endTime = "17:00:00"
    public time = 0
    public guiche = 0    

    constructor(
        filaEspera?:Array<string>,
        filaAtendimento?:Array<string>,
        quantitySP?:number,
        quantitySG?:number,
        quantitySE?:number,
        yourTicket?:string,
        currentTicket?:string,
        lastTypeTicket?:string,
        excededTime?:boolean,
        endTime?:string,
        time?:number,
        guiche?:number,        
    ) {
        this.filaEspera = filaEspera || []
        this.filaAtendimento = filaAtendimento || []
        this.quantitySP = quantitySP || 0
        this.quantitySG = quantitySG || 0
        this.quantitySE = quantitySE || 0
        this.currentTicket = currentTicket || ""
        this.yourTicket = yourTicket || ""
        this.lastTypeTicket = lastTypeTicket || ""
        this.excededTime = excededTime || false
        this.endTime = endTime || "17:00:00"
        this.time = time || 0
        this.guiche = guiche || 0        
    }

    veririficationPriority() {     
        if(this.lastTypeTicket === "SG" || this.lastTypeTicket === "SE" || this.lastTypeTicket === "") {
            let sp = this.filaEspera.findIndex((value:string) => value.search("SP") !== -1)
            if (sp !== -1) return {index:sp,typeTicket:"SP"}

            let se = this.filaEspera.findIndex((value:string) => value.search("SE") !== -1)
            if (se !== -1) return {index:se,typeTicket:"SE"}
            
            let sg = this.filaEspera.findIndex((value:string) => value.search("SG") !== -1)
            if (sg !== -1) return {index:sg,typeTicket:"SG"}        
        }  
        if(this.lastTypeTicket === "SP") {        
            let se = this.filaEspera.findIndex((value:string) => value.search("SE") !== -1)
            if (se !== -1) return {index:se,typeTicket:"SE"}
            
            let sg = this.filaEspera.findIndex((value:string) => value.search("SG") !== -1)        
            if (sg !== -1) return {index:sg,typeTicket:"SG"}        
        }    
        return {index:null,typeTicket:null}         
    }

    addQueue(typeTicket:string) {
        this.addTime(typeTicket)        

        if (!this.excededTime){                       
            let ticket = this.createTicket(typeTicket,this.getOrder(typeTicket))
            this.yourTicket = ticket
            this.filaEspera.push(ticket)
        }      
    }

    getOrder(typeTicket="") {    
        if (typeTicket)
            switch (typeTicket) {
                case "SP": return this.quantitySP += 1;
                case "SE": return this.quantitySE += 1;
                case "SG": return this.quantitySG += 1;                   
            }
        return 0
    }

    createTicket(typeTicket="",orderTicket=0) {
        if (typeTicket && orderTicket) {
            const d = new Date()            
            let order = convertIntergerDigits(orderTicket)
            let year = String(d.getFullYear()).slice(2,4)    
            let month = convertIntergerDigits(d.getMonth() + 1)
            let day = convertIntergerDigits(d.getDate())

            return `${year}${month}${day}-${typeTicket}${order}`   
        }  
        return ''  
    }

    proximaSenha() {
        const {index, typeTicket} = this.veririficationPriority()
        
        if (this.lastTypeTicket !== "") this.subtractTime(this.lastTypeTicket)    

        if (index !== null) {
            this.currentTicket = this.filaEspera[index]        
            this.filaEspera[index] = ""
            this.filaAtendimento.push(this.currentTicket)
            this.lastTypeTicket = typeTicket 
            this.getGuiche()        
        }        
    }
    
    addTime(typeTicket="") {    
        let dfinal = new Date()    
        this.time += worstTimePerTicket(typeTicket)
        dfinal.setMinutes(this.time)
        
        if (dfinal.toLocaleTimeString() > this.endTime) this.excededTime= true
    }

    subtractTime(typeTicket="") {    
        let dfinal = new Date()    
        this.time -= worstTimePerTicket(typeTicket)
        dfinal.setMinutes(this.time)
        
        if (dfinal.toLocaleTimeString() > this.endTime) this.excededTime = false        
        
    }

    getGuiche(){
        let g = Math.floor(Math.random()*5)
        while(g===this.guiche){
            g = Math.floor(Math.random()*5)
        }
        this.guiche=g
    }

    getQuantityTicketAcceptedPerPriority(){
        let se = 0; let sg = 0; let sp = 0;
        this.filaAtendimento.forEach(element => {
            if (element.search("SG")!== -1)
                sg += 1

            else if (element.search("SP")!== -1)
                sp += 1

            else if (element.search("SE")!== -1)
                se += 1 
        })
        console.log("se",se);
        console.log("sg",sg);
        console.log("sp",sp)
        return {se,sg,sp}
    }

    gerarRelatorio(){
        const {se,sp,sg} = this.getQuantityTicketAcceptedPerPriority()
        return {
            quantityTickets: this.filaEspera.length,
            quantityAcceptedTicket: this.filaAtendimento.length,
            quantitySE:this.quantitySE,
            quantitySEAccepted:se,
            quantitySG:this.quantitySG,
            quantitySGAccepted:sg,
            quantitySP:this.quantitySP,
            quantitySPAccepted:sp
        }
    }

}
