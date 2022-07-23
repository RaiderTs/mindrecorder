import Preloader from '../Preloader';

const preloaderArr = Array.from(Array(10).keys());
const preloaderMarkup = preloaderArr.map((value, i) => (
  <div key={i}>
    <Preloader
      height={'h-[183px]'}
      width={'w-[252px]'}
      rounded={'rounded-[5px]'}
    />
    <div className='mt-3'>
      <Preloader
        height={'h-[5px]'}
        width={'w-[252px]'}
        rounded={'rounded-[5px]'}
      />
    </div>
    <div className='flex  justify-between w-[252px]'>
      <div className='flex items-baseline justify-between w-24'>
        <div className='mt-2'>
          <Preloader
            height={'h-[5px]'}
            width={'w-[45px]'}
            rounded={'rounded-[5px]'}
          />
        </div>
        <div className='mt-3'>
          <Preloader
            height={'h-[5px]'}
            width={'w-[45px]'}
            rounded={'rounded-[5px]'}
          />
        </div>
      </div>
      <div className='flex items-baseline justify-between w-24'>
        <div className='mt-2'>
          <Preloader
            height={'h-[5px]'}
            width={'w-[45px]'}
            rounded={'rounded-[5px]'}
          />
        </div>
        <div className='mt-3'>
          <Preloader
            height={'h-[5px]'}
            width={'w-[45px]'}
            rounded={'rounded-[5px]'}
          />
        </div>
      </div>
    </div>
  </div>
));

export default preloaderMarkup;
