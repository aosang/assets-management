"use client";

import { useEffect, useState } from "react";
import {flexible} from './phone.js'
import QRCode from "qrcode.react";
import tempcss from './temp.module.scss'



const TemplateCode: React.FC = () => {
  const [tableData, setTableData] = useState([
    { id: 1, name: "Alice", age: 25, city: "New York" },
    { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
    { id: 3, name: "Charlie", age: 35, city: "Chicago" },
  ]);

  const [qrCodeData, setQrCodeData] = useState<any>("");

  const generateQRCode = () => {
    const dataString = 'https://www.baidu.com'
    setQrCodeData(dataString);
  };

  useEffect(() => {
    flexible()
  }, []);

  return (
    <div className={tempcss.rootLay}>
      <div className={tempcss.container}>
        <div className={tempcss.container_nav}>
          <h2>Device Info</h2> 
        </div>
        <ul className={tempcss.container_info}>
          <li>
            <span>Device-number:</span>
            <p>202411241916</p>
          </li>
          <li>
            <span>Device-name:</span>
            <p>Macbook M2</p>
          </li>
          <li>
            <span>Device-type:</span>
            <p>Laptod</p>
          </li>
          <li>
            <span>Device-brand:</span>
            <p>Apple</p>
          </li>
          <li>
            <span>Device-remark:</span>
            <p>AppleAppleAppleAppleAppleAppleAppleAppleApple</p>
          </li>
        </ul>
      </div>
      <div></div>
    </div>
  )
}

export default TemplateCode;
