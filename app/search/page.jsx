async function page({ searchParams }) {
   const { query } = await searchParams;

   return <div>Search page</div>;
}

export default page;
