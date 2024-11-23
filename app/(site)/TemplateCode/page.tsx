"use client";

import React, { useState } from "react";
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

  return (
    <html lang="en">
      <body className={tempcss.bgall}>
        <div></div>
      </body>
    </html>
  )
}

export default TemplateCode;
