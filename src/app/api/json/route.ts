import { NextRequest, NextResponse } from "next/server";
import{ any, Schema, z } from "zod";

const deteminshcmeaType=(schema: any)=>{
   // if the type is not present in the body 
   if(!schema.hasOwnProperty("type")) {
      if(Array.isArray(schema)){
         return "array";
      }else{
         return typeof schema ; 
      }
   }
}

// the function to  cover the schema 
const jsonToSchema =(schema: any)=>{
    const type= deteminshcmeaType(schema);

    // create the required z type
    switch(type){
       case "string": return z.string().nullable();
    }
}
export const POST = async (req: NextRequest) => {
   const body = await req.json();
     
      //  unstructed data 
      const genericSchema =z.object({
         data: z.string(), 
         format:z.object({ }).passthrough() ,
      })
      const {data, format}= genericSchema.parse(body);
       
      // create the expected schema the user want
       const dynamicSchema= jsonToSchema(format);
      return NextResponse.json({ res });
};
 