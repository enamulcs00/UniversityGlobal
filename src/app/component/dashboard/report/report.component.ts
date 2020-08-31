import { Component, OnInit, NgZone } from '@angular/core';
import { ServicesService } from 'src/app/services.service';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  countryList: any = [];
  reportsCountData: any
  fromDate: any;
  toDate: any;
  fromDateView: any;
  toDateView: any;
  month: any
  year: any
  countryName:any = ''
  private chart: am4charts.XYChart;
  chartData: any = [
    { key: "CONDITIONAL", value: 0 },
    { key: "UNCONDITIONAL", value: 0 },
    { key: "CONDITIONAL", value: 0 },
    { key: "UNCONDITIONAL", value: 0 },
    { key: "ADITIONAL", value: 0 },
    { key: "TUTION", value: 0 },
    { key: "VISA", value: 0 },
    { key: "CAS", value: 0 },
    { key: "OFFER", value: 0 },
    { key: "OFFER", value: 0 },
    { key: "OFFER", value: 0 },
    { key: "REJECTED", value: 0 },
    { key: "DECISION", value: 0 },
    { key: "NEW", value: 0 },
    { key: "REVIEW", value: 0 },
    { key: "ADITIONAL", value: 0 },
    { key: "TUTION", value: 0 },
    { key: "WITHDRAWAL", value: 0 },
    { key: "CONDITIONAL", value: 0 },
    { key: "UNCONDITIONAL", value: 0 },
    { key: "CONDITIONAL", value: 0 },
    { key: "UNCONDITIONAL", value: 0 },
    { key: "DECLINED", value: 0 },
    { key: "DEFERAL", value: 0 },
    { key: "COMPLETE", value: 0 },
    { key: "INCOMPLETE", value: 0 }
  ]

  constructor(private service: ServicesService, private zone: NgZone) { }

  ngAfterViewInit() {
    this.createChart()
  }

  createChart() {
    this.zone.runOutsideAngular(() => {
      // Create chart instance
      var chart = am4core.create("chartdiv", am4charts.XYChart);

      // Add data
      chart.data = this.chartData

      // Create axes

      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "key";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
        let a: any = 2
        if (target.dataItem && target.dataItem.index) {
          return dy + 25;
        }
        return dy;
      });

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "value";
      series.dataFields.categoryX = "key";
      series.name = "value";
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.columns.template.fillOpacity = .8;

      var columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;
    }); //
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  ngOnInit() {
      localStorage.removeItem('section1')
      localStorage.removeItem('section2')
      localStorage.removeItem('section3')
      localStorage.removeItem('section4')
      localStorage.removeItem('section5')
      localStorage.removeItem('section6')
      localStorage.removeItem('section7')
      localStorage.removeItem('section8')
      localStorage.removeItem('section9')
      localStorage.removeItem('section10')
      localStorage.removeItem('section11')
      localStorage.removeItem('section12')
      localStorage.removeItem('section13')
      localStorage.removeItem('section14')
    this.service.getCountryStates().subscribe((res: any) => {
      this.countryList = res
    })
    let date = new Date()
    this.fromDate = (date.getFullYear() - 1) +'-'+( date.getMonth() > 10 ? date.getMonth() : '0'+ (date.getMonth() + 1) )+ '-' + date.getDate()
    this.toDate = date.getFullYear() +'-'+( date.getMonth() > 10 ? date.getMonth() + 1 : '0'+ (date.getMonth()+1) )+ '-' + date.getDate();
    let stringDate = date.toString()
    this.month = stringDate.split(' ')[1]
    this.year = stringDate.split(' ')[3]
    this.reportCountApi()
    this.searchReportChart()
  }

  reportCountApi() {
    this.service.showSpinner()
    let url = `course/get-form-count`;
    if(this.countryName != ''){
      url = url + `?country=${this.countryName}`
    }
    this.service.getApi(url, 1).subscribe((res: any) => {
      if (res.body.status == 200) {
        this.reportsCountData = res.body.data
        this.service.hideSpinner()
      }else{
        this.service.hideSpinner()
        this.reportsCountData = {
          dayCount : 0,
          weekCount : 0,
          monthCount : 0,
          yearCount : 0
        }
      }
    })
  }

  resetCount(){
    this.countryName = ''
    this.reportCountApi()
  }

  reset(){
    this.fromDate = null
    this.toDate = null
  }

  searchReportChart() {
    if (!this.fromDate && !this.toDate) {
      return false
    }
    let fromDate = new Date(this.fromDate)
    let toDate = new Date(this.toDate)
    this.fromDateView = fromDate.getDate() + '/' + ( fromDate.getMonth() > 10 ? fromDate.getMonth() : '0'+ fromDate.getMonth() ) + '/'+ (fromDate.getFullYear())
    this.toDateView = toDate.getDate() + '/' + ( toDate.getMonth() > 10 ? toDate.getMonth() : '0'+ toDate.getMonth() ) + '/' + (toDate.getFullYear())
    this.service.showSpinner()
    this.service.getApi(`course/get-graph-data-for-application-status?fromDate=${this.convertIntoTimeStamp(this.fromDate)}&toDate=${this.convertIntoTimeStamp(this.toDate)}`, 1).subscribe((res: any) => {
      console.log("res-->>", res.body.data)
      let data = res.body.data
      let resChartData = []
      this.service.hideSpinner()
      data.forEach((element,i) => {
        resChartData.push({
          "key": (Object.keys(element)[0]).split('_')[0].toLowerCase(),
          "value": Object.values(element)[0]
        })
      });
      console.log("chartData--->", resChartData)
      this.chartData = resChartData
      this.createChart()
    })
  }

  convertIntoTimeStamp(myDate) {
    myDate = myDate.split("-");
    var newDate = myDate[1] + "/" + myDate[2] + "/" + myDate[0];
    console.log(new Date(newDate).getTime());
    return (new Date(newDate).getTime())
  }

}
