import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapModal = ({ isModalOpen, setIsModalOpen }: any) => {
     // Set your desired map options
     const mapOptions = {
          center: { lat: 32, lng: 35 },
          zoom: 10,
     };

     const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

     return (
          <Modal width={1000} title="Map" open={isModalOpen} onCancel={() => setIsModalOpen(!isModalOpen)} footer={false} >

               <LoadScript googleMapsApiKey={String(apiKey)}>
                    <GoogleMap
                         mapContainerStyle={{ height: '600px', width: '100%' }}
                         options={mapOptions}
                    >
                         {/* Add your markers or other map components here */}
                    </GoogleMap>
               </LoadScript>
          </Modal>
     )
}

export default MapModal