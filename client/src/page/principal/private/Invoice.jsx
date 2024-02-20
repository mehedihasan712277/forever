import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { FaDownload } from "react-icons/fa";

const Invoice = ({ tuid }) => {
    // console.log(tuid);
    const [data, setData] = useState(null)
    useEffect(() => {
        axios.get(`https://server-forever.vercel.app/orders/${tuid}`)
            .then(res => {
                setData(res.data)
            })
    }, [tuid])
    console.log(data);
    function generatePDF() {
        let pdf = new jsPDF();

        let url = 'https://i.ibb.co/rf0Qzmh/logo-f.png';
        pdf.addImage(url, 'JPEG', 0, 0, 210, 60)

        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'normal');

        pdf.text(20, 70, 'Bill from');
        pdf.text(150, 70, 'Bill to');

        pdf.text(20, 80, `${data[0].userName}`);
        pdf.text(20, 85, `${data[0].address.house}`);
        pdf.text(20, 90, `${data[0].address.phone}`);

        pdf.text(150, 80, `Sakib Akondo`);
        pdf.text(150, 85, `Forever BD store`);
        pdf.text(150, 90, `01580841529`);




        //------------------------table--------------------
        let tableInfo = data.map(obj => [obj.productName, obj.regularPrice, obj.reducedPrice])
        const tableData = [
            ['Item Name', 'Regular Price', 'Reduced Price',],
            // [name[0], 2, 10, 20],
            // [name[1], 1, 20, 20],
            // [name[2], 3, 15, 45]
            ...tableInfo,
            ['', '', `Total: ${data[0].totalPrice}`]
        ];
        const styles = {
            fillColor: [200, 200, 200], // Background color of header
            fontSize: 12, // Font size
            font: 'helvetica', // Font family
            fontStyle: 'bold', // Font style
            lineColor: [0, 0, 0], // Border color
            lineWidth: 0, // Border width
            textColor: [0, 0, 0] // Text color of header (white)
        };
        const columnWidths = [90, 45, 45];
        pdf.autoTable({
            startY: 110, // Y position of the table
            head: [tableData[0]], // Table header
            body: tableData.slice(1), // Table data excluding the header
            styles: styles, // Table styling
            columnStyles: {
                0: { cellWidth: columnWidths[0] }, // Column 1 width
                1: { cellWidth: columnWidths[1] }, // Column 2 width
                2: { cellWidth: columnWidths[2] }, // Column 3 width
            },
            margin: { top: 10 } // Margin top
        });


        pdf.save('Invoice.pdf');
    }

    return (
        <>
            <button className='btn text-blue-900 btn-outline btn-sm rounded-sm absolute bottom-2 right-2' onClick={generatePDF}>
                <FaDownload />
                Invoice
            </button>
        </>
    )
}

export default Invoice