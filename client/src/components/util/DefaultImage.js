import React from 'react'
import emptyimage from  '../images/emptyimage.png'
import save from '../util/Util.js'

export default async function emptyimageurl(){
    return await save("emptyimage" ,emptyimage);
}