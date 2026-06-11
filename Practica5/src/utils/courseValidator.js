const validProperties = ["name","degree","lecturer","schedule","credits","active"];
const allowedSchedules = ["A+","B+","A","B","C","D","E","Z"];

export function validateCourseBody(body, hasId=false, isComplete=false){
    if(body){
        const validPropsInBody = validProperties.filter(p => Object.prototype.hasOwnProperty.call(body,p));

        if(isComplete){
            const missing = validProperties.filter(p => !Object.prototype.hasOwnProperty.call(body,p));
            if(missing.length > 0){
                return { validation: false, message: `Body is missing required properties: ${missing.join(", ")}` };
            }
        } else {
            if(validPropsInBody.length === 0){
                return { validation: false, message: "Body has none valid property" };
            }
        }

        return validateBodyCorrectness(body, validPropsInBody);
    }
    else{
        return { validation: false, message: "body is empty and is required" };
    }
}

function validateBodyCorrectness(body, props){
    for(const property of props){
        switch(property){
            case "name":
                if(typeof body.name !== 'string') return { validation: false, message: "name is invalid" };
                break;
            case "degree":
                if(typeof body.degree !== 'string') return { validation: false, message: "degree is invalid" };
                break;
            case "lecturer":
                if(typeof body.lecturer !== 'string') return { validation: false, message: "lecturer is invalid" };
                break;
            case "schedule":
                if(typeof body.schedule !== 'string' || !allowedSchedules.includes(body.schedule)) return { validation: false, message: "schedule is invalid" };
                break;
            case "credits":
                const credits = Number(body.credits);
                if(!Number.isInteger(credits) || credits <= 0 || credits > 10) return { validation: false, message: "credits is invalid" };
                break;
            case "active":
                if(typeof body.active !== 'boolean'){
                    // allow 0/1 as alternatives
                    const activeNum = Number(body.active);
                    if(!(activeNum === 0 || activeNum === 1)) return { validation: false, message: "active is invalid" };
                }
                break;
            default:
                return { validation: false, message: `Body has a non allowed property called ${property} for course` };
        }
    }
    return { validation: true, message: "all validation passed" };
}
