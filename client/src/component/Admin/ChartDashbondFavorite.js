import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import axiosClient from '../../api/axiosClient'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Ranking from './Ranking';
import Button from 'react-bootstrap/Button';
import TableFavorite from './TableFavorite';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartDashbondFavorite() {
  const [isShowTable,setIsShowTable] = useState(false)
    const {data,isLoading} = useQuery(['asdasddsada'],async() => {
        const res = await axiosClient.get(`/favorite/fetchTopFavorite`)
        return res.data
    })
    let datas = {
        labels: [],
        datasets: [
          {
            label: '# of Votes',
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
 data &&  data.listCuoi.forEach((e,i) => {
    const name = e.product.name
    datas.labels = [...datas.labels,name]
    datas.datasets[0].data = [...datas.datasets[0].data,e.count]
   })
  return (
   <div>
   <h1 style={{textAlign : 'center' , color : 'red' , textShadow : '0 0 5px #999'}}></h1>
     <div style={{display : 'flex' , justifyContent : 'space-between' , width : '100%' , padding : '50px'}}>
      <div style={{width : '50%' , display : 'flex' ,flexDirection : 'column' , alignItems : 'center' ,gap : '20px'}} >  <Pie data={datas} /> <Button onClick={() => setIsShowTable(!isShowTable)} variant="primary">Xem thêm</Button></div>
      {data &&  <Ranking field="count" title="Bảng xếp hạng lượt theo dõi" data={data.listCuoi}/>}
    </div>
   { isShowTable && <TableFavorite />}
   </div>
  )
}
