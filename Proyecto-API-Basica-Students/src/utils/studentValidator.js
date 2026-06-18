export function validateStudentBody(body, hasId, isComplete){
    const validProperties = ["id", "name", "grade", "site", "active"];
    if(body){
        const studentId = body.id
        if(hasId && studentId==undefined){
            console.log("student id is not present in the body, but id is required");
            return {
                "validation": false,
                "message": "student id is not present in the body, but id is required"
            }; // We do not have id and id is required
        }
        const validPropertiesInBody = validProperties.filter( property => body.hasOwnProperty(property));
        if(isComplete){
            if(validPropertiesInBody.length != validProperties.length){
                console.log("Body is not complete for use student API");
                return {
                    "validation": false,
                    "message": "Body is not complete for use student API"
                };
            }
        }
        else{
            if(validPropertiesInBody.length == 0){
                console.log("Body has none valid property");
                return {
                    "validation": false,
                    "message": "Body has none valid property"
                };
            }
        }
        return validateBodyCorrectness(body,validPropertiesInBody);
    }
    else{
        console.log("body is empty and is required");
        return {
            "validation": false,
            "message": "body is empty and is required"
        }; // If we do not have a body in the request
    }
}

function validateBodyCorrectness(body,validPropertiesInBody){
    let validationResult = null;
    for(let property of validPropertiesInBody){
        console.log(`Checking property called ${property}`);
        switch(property){
            case "id":
                break;
            case "name":
                validationResult = validateName(body.name);
                if(!validationResult.validation) return validationResult;
                break
            case "grade":
                validationResult = validateGrade(body.grade);
                if(!validationResult.validation) return validationResult;
                break
            case "site":
                validationResult = validateSite(body.site);
                if(!validationResult.validation) return validationResult;
                break
            case "active":
                validationResult = validateActive(body.active);
                if(!validationResult.validation) return validationResult;
                break
            default:
                console.log(`Body has a non allowed property called ${property} for student`);
                return {
                    "validation": false,
                    "message": `Body has a non allowed property called ${property} for student`
                }
        }
    }
    return {
        "validation": true,
        "message": "all validation passed"
    };
}

function validateId(studentId){
    const id = Number(studentId) ?? 0;
    return {
        "validation": id > 0,
        "message": "id is invalid"
    };
}

function validateName(studentName){
    return {
        "validation": (typeof studentName === "string"),
        "message": "student name is invalid"
    };
}

function validateGrade(studentGrade){
    const grade = Number(studentGrade) ?? -1;
    return {
        "validation": (grade >= 0 && grade <= 100),
        "message": "grade is invalid"
    };
}

function validateSite(studentSite){
    let validation = false;
    if(typeof studentSite === "string"){
        if(studentSite === "LP" || studentSite === "CB" || studentSite === "SC"){
            validation = true;
        }
    }
    return {
        validation,
        "message": "site is invalid"
    };
}

function validateActive(studentActive){
    const active = Number(studentActive) ?? -1;
    return {
        "validation": (active == 0 || active == 1),
        "message": "active is invalid"
    };
}