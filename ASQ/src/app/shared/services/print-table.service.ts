import { Injectable } from '@angular/core';

import * as jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PrintTableService {
  constructor() {}

  generate(title: string, columns: Array<any>, rows: Array<any>) {
    const doc = new jsPDF('p', 'pt', 'letter', true);
    const totalPagesExp = '{total_pages_count_string}';

    const pageContent = function(data) {
      // HEADER
      doc.setFontSize(18);
      doc.setFontStyle('normal');
      doc.text(title, 40, 30);

      // FOOTER
      let str = 'Page ' + data.pageCount;
      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === 'function') {
        str = str + ' of ' + totalPagesExp;
      }
      doc.setFontSize(10);
      doc.text(
        str,
        data.settings.margin.left,
        doc.internal.pageSize.height - 10
      );
    };

    const options = {
      addPageContent: pageContent,
      margin: {
        top: 45
      }
    };

    doc.autoTable(columns, rows, options);
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }
    const fileName = title.replace(/\s/g, '');
    doc.save(`${fileName}.pdf`);
  }

  printListCollection(list: Array<any>) {
    const doc = new jsPDF('p', 'pt', 'letter', true);
    const totalPagesExp = '{total_pages_count_string}';
    const title = 'List of Collection';

    const pageContent = function(data) {
      // HEADER
      doc.setFontSize(18);
      doc.setFontStyle('normal');
      doc.text(title, 40, 30);

      // FOOTER
      let str = 'Page ' + data.pageCount;
      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === 'function') {
        str = str + ' of ' + totalPagesExp;
      }
      doc.setFontSize(10);
      doc.text(
        str,
        data.settings.margin.left,
        doc.internal.pageSize.height - 10
      );
    };

    const options = {
      addPageContent: pageContent,
      margin: {
        top: 80
      }
    };

    list.forEach((item, idx) => {
      const columns = [
        'No',
        'Product Name',
        'Price',
        'Quantity',
        'Total',
        'Date'
      ];
      const rows = [];
      item.orders.forEach((o, i) => {
        const arr = [
          i + 1,
          o.productName,
          o.productPrice,
          o.quantity,
          o.totalPrice,
          o.formatDate
        ];
        rows.push(arr);
      });
      if (!idx) {
        doc.setFontSize(14);
        doc.text(item.date, 40, 70);
        doc.autoTable(columns, rows, options);
      } else {
        doc.setFontSize(14);
        doc.text(item.date, 40, doc.autoTableEndPosY() + 30);
        doc.autoTable(columns, rows, {
          startY: doc.autoTableEndPosY() + 40
        });
      }
    });

    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }
    const fileName = title.replace(/\s/g, '');
    doc.save(`${fileName}.pdf`);
  }

  printListOrders(list: Array<any>) {
    const doc = new jsPDF('p', 'pt', 'letter', true);
    const totalPagesExp = '{total_pages_count_string}';
    const title = 'List of Orders';

    const pageContent = function(data) {
      // HEADER
      doc.setFontSize(18);
      doc.setFontStyle('normal');
      doc.text(title, 40, 30);

      // FOOTER
      let str = 'Page ' + data.pageCount;
      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === 'function') {
        str = str + ' of ' + totalPagesExp;
      }
      doc.setFontSize(10);
      doc.text(
        str,
        data.settings.margin.left,
        doc.internal.pageSize.height - 10
      );
    };

    const options = {
      addPageContent: pageContent,
      margin: {
        top: 80
      }
    };

    list.forEach((item, idx) => {
      const columns = ['No', 'Product Name', 'Price', 'Quantity', 'Total'];
      const rows = [];
      item.orders.forEach((o, i) => {
        const arr = [
          i + 1,
          o.productName,
          o.productPrice,
          o.quantity,
          o.totalPrice
        ];
        rows.push(arr);
      });
      if (!idx) {
        doc.setFontSize(14);
        doc.text(`Code: ${item.code} (${item.date})`, 40, 70);
        doc.autoTable(columns, rows, options);
      } else {
        doc.setFontSize(14);
        doc.text(
          `Code: ${item.code} (${item.date})`,
          40,
          doc.autoTableEndPosY() + 30
        );
        doc.autoTable(columns, rows, {
          startY: doc.autoTableEndPosY() + 40
        });
      }
    });

    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }
    const fileName = title.replace(/\s/g, '');
    doc.save(`${fileName}.pdf`);
  }

  printListFeedback(list: Array<any>) {
    const doc = new jsPDF('p', 'pt', 'letter', true);
    const totalPagesExp = '{total_pages_count_string}';
    const title = 'List of Feedback (each Product)';

    const pageContent = function(data) {
      // HEADER
      doc.setFontSize(18);
      doc.setFontStyle('normal');
      doc.text(title, 40, 30);

      // FOOTER
      let str = 'Page ' + data.pageCount;
      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === 'function') {
        str = str + ' of ' + totalPagesExp;
      }
      doc.setFontSize(10);
      doc.text(
        str,
        data.settings.margin.left,
        doc.internal.pageSize.height - 10
      );
    };

    const options = {
      addPageContent: pageContent,
      margin: {
        top: 80
      },
      columnStyles: {
        2: { columnWidth: 300 }
      }
    };

    list.forEach((item, idx) => {
      const columns = ['No', 'Customer Name', 'Message', 'Rate'];
      const rows = [];
      item.feedback.forEach((o, i) => {
        const arr = [i + 1, o.userName, o.message, o.rate];
        rows.push(arr);
      });
      if (!idx) {
        doc.setFontSize(14);
        doc.text(`Product Name: ${item.productName}`, 40, 70);
        doc.autoTable(columns, rows, options);
      } else {
        doc.setFontSize(14);
        doc.text(
          `Product Name: ${item.productName}`,
          40,
          doc.autoTableEndPosY() + 30
        );
        doc.autoTable(columns, rows, {
          startY: doc.autoTableEndPosY() + 40,
          columnStyles: {
            2: { columnWidth: 300 }
          }
        });
      }
    });

    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }
    const fileName = title.replace(/\s/g, '');
    doc.save(`${fileName}.pdf`);
  }
}
