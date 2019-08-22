import { PurchaseService } from './../../_service/purchase.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  chart: any;
  type: string;
  pdfSrc: string;

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {
    this.type = 'line';
    this.pdfSrc = '';
    this.draw();
    this.generatePurchaseSummaryReport();
  }

  change(type: string) {
    this.type = type;
    if (this.chart) {
      this.chart.destroy();
    }
    this.draw();
  }

  draw() {
    this.purchaseService.listSummary().subscribe(data => {      
      let quantities = data.map(item => item.quantity);
      let dates = data.map(item => item.date);
      let bgColor = data.map(item => 'rgba('+Math.round(Math.random() * 255)+','+Math.round(Math.random() * 255)+','+Math.round(Math.random() * 255)+', 0.6)');
      let bgBorder = bgColor.map(item => item.replace('0.6', '1.0'));

      this.chart = new Chart('canvas', {
        type: this.type,
        data: {
          labels: dates,
          datasets: [{
            label: 'Quantity',
            data: quantities,            
            fill:false,
            backgroundColor: bgColor,
            borderColor: bgBorder,
            borderWidth: 1
          }]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true,
              ticks : {
                beginAtZero : true
              }
            }],
          },
          tooltips: {
              callbacks: {
                  label: function (tooltipItem, data) {
                      var label = data.datasets[0].labels[tooltipItem.index];
                      return data.label+": "+label;
                  }
              }
          }
        }
      });
    });
  }

  generatePurchaseSummaryReport() {
    this.purchaseService.generatePurchaseSummaryReport().subscribe(data => {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;        
      }
      reader.readAsArrayBuffer(data);
    });
  }

  downloadPurchaseSummaryReport() {
    this.purchaseService.generatePurchaseSummaryReport().subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display: none;');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'Purchase Summary.pdf';
      a.click();
    });
  }
}
