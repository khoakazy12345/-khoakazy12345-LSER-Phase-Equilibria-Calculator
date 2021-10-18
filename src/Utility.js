class Utility   {
    constructor() {
        this.compoundData = require('./data.json');
    }

    getCompoundNameList() {
        var compoundArray = [];
        for (const compound of this.compoundData)    {
            compoundArray.push(compound["Compound Name"]);
        }
    
        return compoundArray;
    }

    /*
    Solvent -> Compound 1
    Solute -> Compound 2
    Formula = c1 + e1*E2 + s1*S2 + a1*A2 + b1*B2 + l1*L2
    */

    calculateLogK(solvent, solute) {
        let c1,e1,s1,a1,b1,l1,E2,S2,A2,B2,L2 = 0;
        for (const compound of this.compoundData)    {
            if (compound["Compound Name"] === solvent)  {
                c1 = typeof compound["c"] === 'string' ? 0 : compound["c"] ;
                e1 = typeof compound["e"] === 'string' ? 0 : compound["e"] ;
                s1 = typeof compound["s"] === 'string' ? 0 : compound["s"] ;
                a1 = typeof compound["a"] === 'string' ? 0 : compound["a"] ;
                b1 = typeof compound["b"] === 'string' ? 0 : compound["b"] ;
                l1 = typeof compound["l"] === 'string' ? 0 : compound["l"] ;
            }
            
            if (compound["Compound Name"] === solute)  {
                E2 = typeof compound["E"] === 'string' ? 0 : compound["E"] ;
                S2 = typeof compound["S"] === 'string' ? 0 : compound["S"] ;
                A2 = typeof compound["A"] === 'string' ? 0 : compound["A"] ;
                B2 = typeof compound["B"] === 'string' ? 0 : compound["B"] ;
                L2 = typeof compound["L"] === 'string' ? 0 : compound["L"] ;
            }
        }
        return (c1 + e1*E2 + s1*S2 + a1*A2 + b1*B2 + l1*L2).toFixed(3);
    }

    /*
    Formula = -(logK / Math.log10(Math.E)) * 298.15 * ((8.314462 / 4.184 / 1000))
    */

    calculateFreeEnergy(logK) {
        return -(logK / Math.log10(Math.E)) * 298.15 * ((8.314462 / 4.184 / 1000)).toFixed(5);
    }
}

export default Utility;