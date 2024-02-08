import { useEffect, useRef, useState } from "react"
import moveButton from '../images/up.png'

function Dialogue() {

  const previousRef = useRef()
  const currentRef = useRef()
  const currentPianYingRef = useRef()
  const nextfRef = useRef()
  const [currentIndex, setCurrentIndex] = useState(0)
 
  const speach = [
    '早上好 / 中午好 / 晚上好---女士/先生. 欢迎入住七尚酒店',
    '想问一下您这边提前预定过房间了吗？',
    '方便问一下预定号是多少或者用哪位的名字预定的呢',
    '有看到您的预定哈. 您预定的是一居室大床房，住两个晚上，对吗',
    '好的！那先借用一下您的证件， 你们是两位入住 对吗',
    'Rc:您的房间是在我们1号楼的三楼，住2个晚上',
    '房间有包含了两份早餐 早餐的用餐时间是7点~11点，餐厅位置是出门右手边的西餐厅',
    '大堂的尽头左转是中餐厅 ',
    '想问一下您这边有吸烟的习惯吗?',
    '标准退房时间是中午的12点，如果您有需要完一些退的话，',
    '请在离店的当天或者前一个晚上跟前台这边确认是否可以帮您延迟退房',
    '那没有问题的话，帮我在这张上面签个字，留个联系方式',
    '有开车过来的话可以留一下车牌',
    'POA:因为您所有的费用都是在前台现付,',
    '那我这边的话房费加上押金的话一共要收您7000块',
    'TA:因为您的房费已经有提前付过了哈,',
    '那我这边只需要收您一个押金 两晚的话一共收您3000块押金',
    '这是您的两张房卡 还有您的证件，请您收好',
    '我们礼宾同事Ken会送您回房间~'
  ]

  const speachPianYing = [
    'zǎo shàng hǎo / zhōng wǔ hǎo / wǎn shàng hǎo --- nǚ shì / xiān shēng . huān yíng rù zhù qī shàng jiǔ diàn ',
    'xiǎng wèn yī xià nín zhè biān tí qián yù dìng guò fáng jiān le ma ？', 
    'fāng biàn wèn yī xià yù dìng hào shì duō shǎo huò zhě yòng nǎ wèi de míng zì yù dìng de ne ', 
    'yǒu kàn dào nín de yù dìng hā . nín yù dìng de shì yī jū shì dà chuáng fáng ， zhù liǎng gè wǎn shàng ， duì ma ', 
    'hǎo de ！ nà xiān jiè yòng yī xià nín dí zhèng jiàn ， ni men shì liǎng wèi rù zhù duì ma ', 
    'Rc: nín de fáng jiān shì zài wǒ men 1 hào lóu de sān lóu ， zhù 2 gè wǎn shàng ', 
    'fáng jiān yǒu bāo hán le liǎng fèn zǎo cān zǎo cān de yòng cān shí jiān shì 7 diǎn ~11 diǎn ， cān tīng wèi zhì shì chū mén yòu shǒu biān de xī cān tīng ', 
    'dà táng de jìn tóu zuǒ zhuǎn shì zhōng cān tīng ', 
    'xiǎng wèn yī xià nín zhè biān yǒu xī yān de xí guàn ma ?', 
    'biāo zhǔn tuì fáng shí jiān shì zhōng wǔ de 12 diǎn ， rú guǒ nín yǒu xū yào wán yī xiē tuì de huà ，', 
    'qǐng zài lí diàn dí dàng tiān huò zhě qián yí gè wǎn shàng gēn qián tái zhè biān què rèn shì fǒu kě yǐ bāng nín yán chí tuì fáng ', 
    'nà méi yǒu wèn tí de huà ， bāng wǒ zài zhè zhāng shàng miàn qiān gè zì ， liú gè lián xì fāng shì ', 
    'yǒu kāi chē guò lái de huà kě yǐ liú yī xià chē pái ', 
    'POA: yīn wèi nín suǒ yǒu de fèi yòng dōu shì zài qián tái xiàn fù ,', 
    'nà wǒ zhè biān de huà fáng fèi jiā shang yā jīn de huà yī gòng yào shōu nín 7000 kuài ', 
    'TA: yīn wèi nín de fáng fèi yǐ jīng yǒu tí qián fù guò le hā ,', 
    'nà wǒ zhè biān zhǐ xū yào shōu nín yí gè yā jīn liǎng wǎn de huà yī gòng shōu nín 3000 kuài yā jīn ', 
    'zhè shì nín de liǎng zhāng fáng kǎ hái yǒu nín dí zhèng jiàn ， qǐng nín shōu hǎo ', 
    'wǒ men lǐ bīn tóng shì Ken huì sòng nín huí fáng jiān ~'
  ]


  
  useEffect(() => {
    if (currentIndex === 0) {
      previousRef.current.textContent = null
      currentRef.current.textContent = speach[currentIndex]
      currentPianYingRef.current.textContent = speachPianYing[currentIndex]
      nextfRef.current.textContent = speach[currentIndex+1]
    } else {
      previousRef.current.textContent = speach[currentIndex-1]
      currentRef.current.textContent = speach[currentIndex]
      currentPianYingRef.current.textContent = speachPianYing[currentIndex]
      nextfRef.current.textContent = speach[currentIndex+1]
    }
  }, [currentIndex])

  const moveTextForward = () => {
    previousRef.current.classList.add('speach__phrase_previous')
    currentRef.current.classList.add('speach__phrase_current')
    currentPianYingRef.current.classList.add('speach__phrase_current')
    nextfRef.current.classList.add('speach__phrase_next')
    
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1)
      previousRef.current.classList.remove('speach__phrase_previous')
      currentRef.current.classList.remove('speach__phrase_current')
      currentPianYingRef.current.classList.remove('speach__phrase_current')
      nextfRef.current.classList.remove('speach__phrase_next')
    }, 200)
  }

  const moveTextBack = () => {
    previousRef.current.classList.add('speach__phrase_previous-moved_back')
    currentRef.current.classList.add('speach__phrase_current-moved_back')
    currentPianYingRef.current.classList.add('speach__phrase_current-moved_back')
    nextfRef.current.classList.add('speach__phrase_next-moved_back')
    
    setTimeout(() => {
      setCurrentIndex(currentIndex - 1)
      previousRef.current.classList.remove('speach__phrase_previous-moved_back')
      currentRef.current.classList.remove('speach__phrase_current-moved_back')
      currentPianYingRef.current.classList.remove('speach__phrase_current-moved_back')
      nextfRef.current.classList.remove('speach__phrase_next-moved_back')
    }, 200)
  }

  return(
    <div className="speach">
      {/* <div className="speach__element speach__adjustments">
        <div className="speach__adjustment_detailed">
          <p>Enter r/n</p>
          <input></input>
        </div>
        <div className="speach__adjustment_detailed">
          <p>Enter room rate</p>
          <input></input>
        </div>
        <div className="speach__adjustment_detailed">
          <p>Enter deposit</p>
          <input></input>
        </div>
      </div> */}
      {currentIndex === speach.length - 1 ? (null) : (<img src={moveButton} className="speach__move-button" onClick={moveTextForward} />)}
      <div className="speach__element speach__element_animated">
        {/* here previous msg */}
        <p ref={previousRef} className="speach__phrase"></p>
        <div>
          <p ref={currentRef} className="speach__phrase speach__actual"></p>
          <p ref={currentPianYingRef} className="speach__phrase speach__pian-ying"></p>
        </div>
        <p ref={nextfRef} className="speach__phrase"></p>
      </div>

      {currentIndex === 0 ? (null) : (<img src={moveButton} className="speach__move-button speach__move-button_back" onClick={moveTextBack} />)}
      
    </div>
  )
}

export default Dialogue