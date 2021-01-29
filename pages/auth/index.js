// pages/auth/index.js
import { request } from '../../request/index'
import {login} from '../../utils/asyncWx.js'
Page({
 async handleGetUserInfo(e){
   try {
    const{rawData,signature,encryptedData,iv}=e.detail
    const {code}=await login()
    const loginParams={rawData,signature,encryptedData,iv,code}
    const {token}=await request({url:"/users/wxlogin",data:loginParams,methods:"post"})
    wx.setStorageSync("token", token);
    wx.navigateBack({
      delta: 1
    });

   } catch (error) {
     console.log(error);
   }
  }
})