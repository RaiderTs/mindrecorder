import Preloader from '../Preloader';

const preloaderArr = Array.from(Array(1).keys());
const preloaderMarkup = preloaderArr.map((value, i) => (
  <div key={i} className='flex justify-between w-full mt-9'>
    <div>
      <Preloader
        height={'h-[452px]'}
        width={'w-[804px]'}
        rounded={'rounded-[5px]'}
      />
      <div className='mt-3'>
        <Preloader
          height={'h-[33px]'}
          width={'w-[712px]'}
          rounded={'rounded-[5px]'}
        />
      </div>
      <div className='flex mt-4'>
        <div>
          <Preloader
            height={'h-[56px]'}
            width={'w-[56px]'}
            rounded={'rounded-[50%]'}
          />
        </div>
        <div className='ml-5'>
          <Preloader
            height={'h-[25px]'}
            width={'w-[155px]'}
            rounded={'rounded-[5px]'}
          />
          <div className='mt-2'>
            <Preloader
              height={'h-[22px]'}
              width={'w-[88px]'}
              rounded={'rounded-[5px]'}
            />
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <Preloader
          height={'h-[33px]'}
          width={'w-[612px]'}
          rounded={'rounded-[5px]'}
        />
      </div>

      <div className='mt-3'>
        <Preloader
          height={'h-[22px]'}
          width={'w-[150px]'}
          rounded={'rounded-[5px]'}
        />
      </div>
    </div>
    <div className='w-[252px] h-[376px] ml-6 '>
      <div className='mt-[34px] flex items-center'>
        <Preloader
          height={'h-[24px]'}
          width={'w-[24px]'}
          rounded={'rounded-[50%]'}
        />
        <div className='ml-4'>
          <Preloader
            height={'h-[20px]'}
            width={'w-[120px]'}
            rounded={'rounded-[5px]'}
          />
        </div>
      </div>
      <div className='mt-[29px] flex items-center'>
        <Preloader
          height={'h-[24px]'}
          width={'w-[24px]'}
          rounded={'rounded-[50%]'}
        />
        <div className='ml-4'>
          <Preloader
            height={'h-[20px]'}
            width={'w-[120px]'}
            rounded={'rounded-[5px]'}
          />
        </div>
      </div>
      <div className='mt-[29px] flex items-center'>
        <Preloader
          height={'h-[24px]'}
          width={'w-[24px]'}
          rounded={'rounded-[50%]'}
        />
        <div className='ml-4'>
          <Preloader
            height={'h-[20px]'}
            width={'w-[120px]'}
            rounded={'rounded-[5px]'}
          />
        </div>
      </div>
      <div className='mt-[29px] flex items-center'>
        <Preloader
          height={'h-[24px]'}
          width={'w-[24px]'}
          rounded={'rounded-[50%]'}
        />
        <div className='ml-4'>
          <Preloader
            height={'h-[20px]'}
            width={'w-[120px]'}
            rounded={'rounded-[5px]'}
          />
        </div>
      </div>
      <div className='mt-[29px] flex items-center'>
        <Preloader
          height={'h-[24px]'}
          width={'w-[24px]'}
          rounded={'rounded-[50%]'}
        />
        <div className='ml-4'>
          <Preloader
            height={'h-[20px]'}
            width={'w-[120px]'}
            rounded={'rounded-[5px]'}
          />
        </div>
      </div>
      <div className='mt-[29px] flex items-center'>
        <Preloader
          height={'h-[24px]'}
          width={'w-[24px]'}
          rounded={'rounded-[50%]'}
        />
        <div className='ml-4'>
          <Preloader
            height={'h-[20px]'}
            width={'w-[120px]'}
            rounded={'rounded-[5px]'}
          />
        </div>
      </div>
    </div>
  </div>
));

export default preloaderMarkup;
