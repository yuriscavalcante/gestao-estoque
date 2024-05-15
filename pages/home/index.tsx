import { Navbar } from '@/components/navbar'
import DefaultLayout from '@/layouts/default'
import React from 'react'

const Home = () => {
  return (
    <section className="flex flex-col items-center gap-4 w-full min-h-screen">
      <Navbar />
      <div>Aqui vai ser um dashboard</div>
    </section>
  );
}

export default Home