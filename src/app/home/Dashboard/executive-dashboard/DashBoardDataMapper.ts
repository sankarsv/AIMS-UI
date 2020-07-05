import { DashBoardServiceInvoker } from "./DashBoardServiceInvoker";
import { Dictionary } from "app/utils/Dictionary";
import { Output, Injectable, EventEmitter } from "@angular/core"
import { httpService } from "../../../../services/httpService";
@Injectable()
export class DashBoardDataMapper {
    BillingDetails: Dictionary<any>;
    BillingTypeDetails: Dictionary<any>;
    LocationWiseDetails: Dictionary<any>;
    BRMList: Dictionary<any>;
    BrmNamesList: any[] = []
    SrJrRatios: Dictionary<any>;
    HeadCounts: Dictionary<any>;
    TraineeDetails: Dictionary<any>;
    BACounts: Dictionary<any>;
    HeadCountMappingData: any[];
    LocationWiseData: Dictionary<any>;
    BADData: any[] = [];
    BillableData: any[] = [];
    NonBillableData: any[] = [];
    BillableTypeData: any[] = [];
    SeniorJuniorData: any[] = [];
    TraineeData: any[] = [];
    @Output() OnDataInitialized: EventEmitter<any> = new EventEmitter();
    public ColorValues: string[] = ['#66CDAA', '#87CEEB', '#20B2AA', '#E9967A', '#DB7093', '#DC143C', '#FF69B4', '#FFA500', '#FF4500', '#FF0000'];
    constructor(public httpService: httpService, public dashBoardService: DashBoardServiceInvoker) { }

    MapDashBoardData() {
        this.dashBoardService.InvokeDashBoardService();
        this.dashBoardService.OnDataFetched.subscribe(res => {
            this.initializeView(res);
            this.OnDataInitialized.emit();
        });
    }

    initializeView(dashBoardDetails: any) {
        if (
            dashBoardDetails[0] != null &&
            dashBoardDetails[1] != null &&
            dashBoardDetails[2] != null &&
            dashBoardDetails[3] != null &&
            dashBoardDetails[4] != null &&
            dashBoardDetails[5] != null &&
            dashBoardDetails[6] != null
        ) {
            this.FillBillingTypeDetails(dashBoardDetails[6]);
            this.FillLocationWiseCount(dashBoardDetails[5]);
            this.FillBillingDetails(dashBoardDetails[0]);
            this.FillSeniorJuniorRatio(dashBoardDetails[1]);
            this.FillHeadCounts(dashBoardDetails[2]);
            this.FillTraineeDetails(dashBoardDetails[3]);
            this.FillBACount(dashBoardDetails[4]);
            this.LoadAccountWiseDetails();
        }
    }

    FillBillingTypeDetails(billingTypeDetails: any) {
        this.BillingTypeDetails = new Dictionary<any>();
        billingTypeDetails.map(billingType => {
            let billingTypeLocal = {
                BRMId: billingType["brmNo"],
                BRMName: billingType["brmName"],
                FPTotal: Number(billingType["fpCountTotal"]),
                TMTotal: Number(billingType["tmCountTotal"]),
                OnFPTotal: Number(billingType["onFPCountTotal"]),
                OnTMTotal: Number(billingType["onTMCountTotal"]),
                OffFPTotal: Number(billingType["offFPCountTotal"]),
                OffTMTotal: Number(billingType["offTMCountTotal"]),
                FPTotalPerc: Number(billingType["fpCountPerc"]),
                TMTotalPerc: Number(billingType["tmCountPerc"]),
                OnFPTotalPerc: Number(billingType["onfpCountPerc"]),
                OnTMTotalPerc: Number(billingType["ontmCountPerc"]),
                OffFPTotalPerc: Number(billingType["offfpCountPerc"]),
                OffTMTotalPerc: Number(billingType["offtmCountPerc"])
            };
            this.BillingTypeDetails.Add(billingTypeLocal.BRMName, billingTypeLocal);
        });
    }

    FillLocationWiseCount(locationWiseDetails: any) {
        this.LocationWiseDetails = new Dictionary<any>();
        locationWiseDetails.map(locationWiseDetail => {
            let LocationWise: any[] = [];
            locationWiseDetail["locationDetails"].map(locations => {
                let locationwise = {
                    Geography: locations["geography"],
                    Location: locations["location"],
                    Count: locations["count"]
                };
                LocationWise.push(locationwise);
            })
            let locationWiseDetailsLocal = {
                BRMId: locationWiseDetail["brmId"],
                BRMName: locationWiseDetail["brmName"],
                LocationWise: LocationWise
            }
            this.LocationWiseDetails.Add(locationWiseDetailsLocal.BRMName, locationWiseDetailsLocal);
        });
    }

    FillBillingDetails(billingDetails: any) {
        this.BillingDetails = new Dictionary<any>();
        billingDetails.map((billingDetail) => {
            let billingDetailsLocal = {
                BRMName: billingDetail["brmName"],
                BRMNumber: billingDetail["brnNumber"],
                BillCount: Number(billingDetail["billableCountTot"]),
                NBillCount: Number(billingDetail["nbCountTot"]),
                BillPerc: Number(billingDetail["billableCountPerc"]),
                NBillPerc: Number(billingDetail["nbCountPerc"]),
                OnBillCount: Number(billingDetail["onbillableCount"]),
                OffBillCount: Number(billingDetail["offbillabeCount"]),
                OnBillPerc: Number(billingDetail["onbillabePerc"]),
                OffBillPerc: Number(billingDetail["offbillabePerc"]),
            };
            this.BillingDetails.Add(billingDetailsLocal.BRMName, billingDetailsLocal);
        });
    }

    FillSeniorJuniorRatio(srjrRatios: any) {
        this.SrJrRatios = new Dictionary<any>();
        srjrRatios.map((srjrRatio) => {
            let srjrRatioLocal = {
                BRMName: srjrRatio["brmName"],
                BRMNumber: srjrRatio["brnNumber"],
                SrCount: Number(srjrRatio["srCountTot"]),
                JrCount: Number(srjrRatio["jrCountTot"]),
                SrCountPerc: Number(srjrRatio["srCountPerc"]),
                JrCountPerc: Number(srjrRatio["jrCountPerc"]),
                OnSrCountTot: Number(srjrRatio["onsrCountTot"]),
                OnJrCountTot: Number(srjrRatio["onjrCountTot"]),
                OffSrCountPerc: Number(srjrRatio["offsrCountPerc"]),
                OffJrCountPerc: Number(srjrRatio["offjrCountPerc"]),
            };
            this.SrJrRatios.Add(srjrRatioLocal.BRMName, srjrRatioLocal);
        });
    }

    FillHeadCounts(headCounts: any) {
        this.HeadCounts = new Dictionary<any>();
        this.HeadCountMappingData = [];
        headCounts.map((headCount) => {
            let headCountLocal = {
                BRMName: headCount["brmName"],
                BRMNumber: headCount["brnNumber"],
                OffTotal: Number(headCount["offTot"]),
                OnShoreTotal: Number(headCount["onsiteTot"]),
                TotalCount: Number(headCount["totalCnt"]),
                OffPerc: Number(headCount["offPerc"]),
                OnshorePerc: Number(headCount["onsitePerc"]),
            };
            this.HeadCounts.Add(headCountLocal.BRMName, headCountLocal);
        });
    }

    FillTraineeDetails(traineeDetails: any) {
        this.TraineeDetails = new Dictionary<any>();
        traineeDetails.map((traineeDetail) => {
            let traineeDetailLocal = {
                BRMName: traineeDetail["brmName"],
                BRMNumber: traineeDetail["brnNumber"],
                TraineeCountTotal: Number(traineeDetail["trCountTot"]),
                TraineeCountPer: Number(traineeDetail["trCountPerc"]),
                OnTraineeCount: Number(traineeDetail["ontrCountTot"]),
                OnShoreTraineePerc: Number(traineeDetail["ontrCountPerc"]),
                OffShoreTraineeCount: Number(traineeDetail["offtrCountTot"]),
                OffShoreTraineePerc: Number(traineeDetail["offtrCountPerc"]),
            };
            this.TraineeDetails.Add(traineeDetailLocal.BRMName, traineeDetailLocal);
        });
    }

    FillBACount(baCounts: any) {
        this.BACounts = new Dictionary<any>();
        baCounts.map((baCount) => {
            let baCountLocal = {
                BRMName: baCount["brmName"],
                BRMNumber: baCount["brnNumber"],
                BACountTotal: Number(baCount["baCountTot"]),
                BACountPerc: Number(baCount["baCountPerc"]),
            };
            this.BACounts.Add(baCountLocal.BRMName, baCountLocal);
        });
    }

    InitializeAccountWiseLocationWiseChart() {
        this.LocationWiseData = new Dictionary<any>();
        let index = 0;
        let dataIndex = 0;
        this.LocationWiseDetails.Values().forEach((key: any) => {
            key.LocationWise.forEach(element => {

                if (element.Geography == "Onsite") {
                    if (this.LocationWiseData.ContainsKey(element.Location)) {
                        this.LocationWiseData.Item(element.Location).data[dataIndex] = element.Count;
                    }
                    else {
                        index++;
                        let dummyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        dummyData[dataIndex] = element.Count;
                        let chartData = { data: dummyData, label: element.Location, stack: 'Onsite', barPercentage: 0.4, backgroundColor: this.ColorValues[index], borderColor: this.ColorValues[index] }
                        this.LocationWiseData.Add(element.Location, chartData);
                    }
                }
                if (element.Geography == "Offsite") {
                    if (this.LocationWiseData.ContainsKey(element.Location)) {
                        this.LocationWiseData.Item(element.Location).data[dataIndex] = element.Count;
                    }
                    else {
                        index++;
                        let dummyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        dummyData[dataIndex] = element.Count;
                        let chartData = { data: dummyData, label: element.Location, stack: 'Offsite', barPercentage: 0.4, backgroundColor: this.ColorValues[index], borderColor: this.ColorValues[index] }
                        this.LocationWiseData.Add(element.Location, chartData);
                    }
                }
            });
            dataIndex++;
        });
    }

    LoadAccountWiseDetails() {
        this.HeadCountMappingData = [];
        this.SeniorJuniorData = [];
        this.BADData = [];
        this.BillableData = [];
        this.NonBillableData = [];
        this.BillableTypeData = [];
        this.TraineeData = [];
        this.HeadCounts.Values().forEach(headCountLocal => {
            this.HeadCountMappingData.push({
                name: headCountLocal.BRMName,
                series: [
                    { name: "OffShore Total", value: headCountLocal.OffPerc },
                    { name: "OnShore Total", value: headCountLocal.OnshorePerc }]
            });
        });
        this.SrJrRatios.Values().forEach(srjrRatioLocal => {
            this.SeniorJuniorData.push({
                name: srjrRatioLocal.BRMName,
                series: [
                    { name: "Senior Count", value: srjrRatioLocal.SrCount },
                    { name: "Junior Count", value: srjrRatioLocal.JrCount }]
            });
        });
        this.BACounts.Values().forEach(baCountLocal => {
            this.BADData.push({ name: baCountLocal.BRMName, value: baCountLocal.BACountPerc });
        });
        this.BillingTypeDetails.Values().forEach(billingTypeLocal => {
            this.BillableTypeData.push({
                name: billingTypeLocal.BRMName,
                series: [
                    { name: "FP Total", value: billingTypeLocal.FPTotal },
                    { name: "TM Total", value: billingTypeLocal.TMTotal }]
            });
        });

        this.InitializeAccountWiseLocationWiseChart();
        this.BillingDetails.Values().forEach(billingDetailsLocal => {
            this.BillableData.push({
                name: billingDetailsLocal.BRMName,
                series:[
                    { name: "Billable Count", value: billingDetailsLocal.BillCount },
                    { name: "Non-Billable Count", value: billingDetailsLocal.NBillCount } ] 
            });
        });
        this.TraineeDetails.Values().forEach(traineeDetailLocal => {
            this.TraineeData.push({
                name: traineeDetailLocal.BRMName,
                series: [
                    { name: "Onshore Trainee Total", value: traineeDetailLocal.OnTraineeCount },
                    { name: "Onshore Non-Trainee Total", value: traineeDetailLocal.TraineeCountTotal },
                    { name: "Offshore Trainee Total", value: traineeDetailLocal.OffShoreTraineeCount },
                    { name: "Offshore Non-Trainee Total", value: traineeDetailLocal.TraineeCountTotal }]
            });
        });
    }

    LoadBrmWiseDetails(selectedBRM: string) {
        this.HeadCountMappingData = [];
        this.SeniorJuniorData = [];
        this.BADData = [];
        this.BillableTypeData = [];
        this.BillableData = [];
        this.TraineeData = [];
        this.HeadCountMappingData.push({ name: "OffShore Total", value: this.HeadCounts.Item(selectedBRM).OffPerc });
        this.HeadCountMappingData.push({ name: "OnShore Total", value: this.HeadCounts.Item(selectedBRM).OnshorePerc });
        this.SeniorJuniorData.push({ name: "Onshore Sr Count", value: this.SrJrRatios.Item(selectedBRM).OnSrCountTot });
        this.SeniorJuniorData.push({ name: "Onshore Jr Count", value: this.SrJrRatios.Item(selectedBRM).OnJrCountTot });
        this.SeniorJuniorData.push({ name: "Offshore Sr Count", value: this.SrJrRatios.Item(selectedBRM).OffSrCountPerc });
        this.SeniorJuniorData.push({ name: "Offshore Jr Count", value: this.SrJrRatios.Item(selectedBRM).OffJrCountPerc });
        this.BADData.push({ name: "BA Data", value: this.BACounts.Item(selectedBRM).BACountPerc });
        this.BillableTypeData.push({ name: "Onshore FP Count", value: this.BillingTypeDetails.Item(selectedBRM).OnFPTotalPerc });
        this.BillableTypeData.push({ name: "Onshore TM Count", value: this.BillingTypeDetails.Item(selectedBRM).OnTMTotalPerc });
        this.BillableTypeData.push({ name: "Offshore FP Count", value: this.BillingTypeDetails.Item(selectedBRM).OffFPTotalPerc });
        this.BillableTypeData.push({ name: "Offshore TM Count", value: this.BillingTypeDetails.Item(selectedBRM).OffTMTotalPerc });
        this.BillableData.push({ name: "Onshore Billable Count", value: this.BillingDetails.Item(selectedBRM).OnBillPerc });
        this.BillableData.push({ name: "Offshore Billable Count", value: this.BillingDetails.Item(selectedBRM).OffBillPerc });
        this.BillableData.push({ name: "Offshore Non-Billable Count", value: this.BillingDetails.Item(selectedBRM).NBillPerc });
        this.TraineeData.push({ name: "Onshore Traniee Data", value: this.TraineeDetails.Item(selectedBRM).OnShoreTraineePerc });
        this.TraineeData.push({ name: "Offshore Traniee Data", value: this.TraineeDetails.Item(selectedBRM).OffShoreTraineePerc });
        this.TraineeData.push({ name: "Onshore Non-Traniee Data", value: this.TraineeDetails.Item(selectedBRM).TraineeCountTotal });
        this.TraineeData.push({ name: "Offshore Non-Traniee Data", value: this.TraineeDetails.Item(selectedBRM).TraineeCountTotal });
        this.LoadBRMWiseLocationData(selectedBRM);
    }

    LoadBRMWiseLocationData(selectedBRM: string) {
        this.LocationWiseData = new Dictionary<any>();
        let index = 0;
        this.LocationWiseDetails.Item(selectedBRM).LocationWise.forEach(element => {
            if (element.Geography == "Onsite") {
                if (this.LocationWiseData.ContainsKey(element.Location)) {
                    this.LocationWiseData.Item(element.Location).data.push(element.Count);
                }
                else {
                    index++;
                    let chartData = { data: [element.Count], label: element.Location, stack: element.Location, barPercentage: 0.4, backgroundColor: this.ColorValues[index], borderColor: this.ColorValues[index] }
                    this.LocationWiseData.Add(element.Location, chartData);
                }
            }
            if (element.Geography == "Offsite") {
                if (this.LocationWiseData.ContainsKey(element.Location)) {
                    this.LocationWiseData.Item(element.Location).data.push(element.Count);
                }
                else {
                    index++;
                    let chartData = { data: [element.Count], label: element.Location, stack: element.Location, barPercentage: 0.4, backgroundColor: this.ColorValues[index], borderColor: this.ColorValues[index] }
                    this.LocationWiseData.Add(element.Location, chartData);
                }
            }
        });
    }

    LoadBRMList() {
        this.BRMList = new Dictionary<any>();
        this.BrmNamesList = [];
        this.dashBoardService.InvokeBRMDetails();
        this.dashBoardService.OnBRMDataFetched.subscribe(response => {
            response.map((brmDetail: { [x: string]: any; }) => {
                let brmDetalLocal = {
                    BRMName: brmDetail["brmName"],
                    BRMId: brmDetail["brmId"]
                };
                this.BRMList.Add(brmDetalLocal.BRMId, brmDetalLocal.BRMName);
                this.BrmNamesList.push({ value: Number(brmDetalLocal.BRMId), title: brmDetalLocal.BRMName })
            });
        });
    }
}