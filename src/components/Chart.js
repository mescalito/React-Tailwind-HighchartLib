import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = ({chartOptions}) => {
  return (
    <HighchartsReact highcharts={Highcharts} options={chartOptions}/>
  )
}

export default Chart
