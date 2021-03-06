import React from 'react'
import { Pie, defaults } from 'react-chartjs-2'

defaults.global.tooltips.enabled = true
defaults.global.legend.position = 'bottom'

const PieChart = (props) => {
  return (
    <div>
      <Pie
        data={{
          labels: props.labels ? props.labels : ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: props.data ? props.data : [
            {
              label: '# of votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: 'red',
              borderColor: 'red',
              borderWidth: 1,
            },
            {
                label: 'Quantity',
                data: [47, 52, 67, 58, 9, 50],
                backgroundColor: 'orange',
                borderColor: 'red',
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          title: {
            display: true,
            fontSize: 20,
            text: props.title ? props.title : 'Custom Chart Title'
        },
          maintainAspectRatio: false,
          legend: {
            labels: {
              fontSize: 16,
            },
          },
        }}
      />
    </div>
  )
}

export default PieChart