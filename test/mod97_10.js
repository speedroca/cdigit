'use strict';
const assert = require('assert').strict;
const common = require('./common');
const algo = require('..').mod97_10;

describe('ISO/IEC 7064, MOD 97-10 algorithm', () => {
  // {{{ List sample strings
  const valid = [
    ['79444', '794', '44'],
    ['3214282912345698765432161182', '32142829123456987654321611', '82'],
    ['06 000 0123456758', '06 000 01234567', '58'],
    ['900596501', '9005965', '01'],
    ['170122496775181', '1701224967751', '81'],
    ['3376959', '33769', '59'],
    ['60242803474357254', '602428034743572', '54'],
    ['24215059340', '242150593', '40'],
    ['9423073768704', '94230737687', '04'],
    ['1378759022748795', '13787590227487', '95'],
    ['554530813969745', '5545308139697', '45'],
    ['987916871', '9879168', '71'],
    ['666529550021', '6665295500', '21'],
    ['53818235782', '538182357', '82'],
    ['2121292250870', '21212922508', '70'],
    ['58424016263', '584240162', '63'],
    ['335757871242', '3357578712', '42'],
    ['413415', '4134', '15'],
    ['0000105594942287263', '00001055949422872', '63'],
    ['173340', '1733', '40'],
    ['81004507', '810045', '07'],
    ['0053826116217006944', '00538261162170069', '44'],
    ['63794371211', '637943712', '11'],
    ['0085554486', '00855544', '86'],
    ['055543746716993', '0555437467169', '93'],
    ['5666963300015', '56669633000', '15'],
    ['00001278481359660446', '000012784813596604', '46'],
    ['4034268683601', '40342686836', '01'],
    ['572692557449', '5726925574', '49'],
    ['00009913013', '000099130', '13'],
    ['393074459', '3930744', '59'],
    ['19919023042', '199190230', '42'],
    ['8989185', '89891', '85'],
    ['910852796', '9108527', '96'],
    ['771074826', '7710748', '26'],
    ['31066636492', '310666364', '92'],
    ['00193796793537', '001937967935', '37'],
    ['35241582347114', '352415823471', '14'],
    ['06897794549', '068977945', '49'],
    ['5399794787307', '53997947873', '07'],
    ['4101258', '41012', '58'],
    ['798512634', '7985126', '34'],
    ['94783218575904266', '947832185759042', '66'],
    ['2509569922100', '25095699221', '00'],
    ['774148580247517', '7741485802475', '17'],
    ['44815', '448', '15'],
    ['28642726816697380', '286427268166973', '80'],
    ['715268204', '7152682', '04'],
    ['56848075487708204', '568480754877082', '04'],
    ['6678451', '66784', '51'],
    ['6648080174', '66480801', '74'],
    ['366285202227487', '3662852022274', '87'],
    ['608967', '6089', '67'],
    ['7431953761', '74319537', '61'],
    ['153131755331', '1531317553', '31'],
    ['2291917', '22919', '17'],
    ['43994543904', '439945439', '04'],
    ['29640997713', '296409977', '13'],
    ['000358899252034', '0003588992520', '34'],
    ['0792052822', '07920528', '22'],
    ['664423485859078', '6644234858590', '78'],
    ['997482623', '9974826', '23'],
    ['74259769628757', '742597696287', '57'],
    ['000704224982126417', '0007042249821264', '17'],
    ['629019490', '6290194', '90'],
    ['951381918', '9513819', '18'],
    ['58483690469', '584836904', '69'],
    ['2779690110658105656137012565651624950', '27796901106581056561370125656516249', '50'],
    ['7290046407591655641508592163006486357479642', '72900464075916556415085921630064863574796', '42'],
    ['932206733032652055167366017586029', '9322067330326520551673660175860', '29'],
    ['0292', '02', '92'],
    ['30924835150563509', '309248351505635', '09'],
    ['524649632973548834738386938017', '5246496329735488347383869380', '17'],
    ['322448254908014251794825914427286053190', '3224482549080142517948259144272860531', '90'],
    ['23500243820140280', '235002438201402', '80'],
    ['5610062641345504953207405300713890206188126', '56100626413455049532074053007138902061881', '26'],
    ['21525562', '215255', '62'],
    ['1816620121284984592412938913019', '18166201212849845924129389130', '19'],
    ['92420820312697691694564127286276729392660618089455', '924208203126976916945641272862767293926606180894', '55'],
    ['054485853770631646395748486268', '0544858537706316463957484862', '68'],
    ['25124011104805482203008027523', '251240111048054822030080275', '23'],
    ['8654730620', '86547306', '20'],
    ['260812975459327578860344265021526217185', '2608129754593275788603442650215262171', '85'],
    ['36006992252038971008798559974233731771', '360069922520389710087985599742337317', '71'],
    ['7287199458306312778764', '72871994583063127787', '64'],
    ['76838648', '768386', '48'],
    ['1815647', '18156', '47'],
    ['261844772818947', '2618447728189', '47'],
    ['1318659381411193605736042144949745322206318', '13186593814111936057360421449497453222063', '18'],
    ['3816951', '38169', '51'],
    ['532369369', '5323693', '69'],
    ['443679', '4436', '79'],
    ['780394802415324542674558990', '7803948024153245426745589', '90'],
    ['7101095809493319410630796985060339784324206126880', '71010958094933194106307969850603397843242061268', '80'],
    ['893152191348360150039194244597340', '8931521913483601500391942445973', '40'],
    ['55085857871406033556199483715954', '550858578714060335561994837159', '54'],
    ['18224823408703290397818358683', '182248234087032903978183586', '83'],
    ['316792590737270063627957704', '3167925907372700636279577', '04'],
    ['045501252249549249413190778849426192295', '0455012522495492494131907788494261922', '95'],
    ['40586876169608405987', '405868761696084059', '87'],
    ['7733759026645196682', '77337590266451966', '82'],
    ['4930996', '49309', '96'],
    ['3563799774218598390798308590832543839', '35637997742185983907983085908325438', '39'],
    ['8052', '80', '52'],
    ['919747358896', '9197473588', '96'],
    ['476960059', '4769600', '59'],
    ['9224232175957721954375860287966', '92242321759577219543758602879', '66'],
    ['12006542700542680984284664008705360038097490857402', '120065427005426809842846640087053600380974908574', '02'],
    ['6861248541583743473135766610115118552640', '68612485415837434731357666101151185526', '40'],
    ['32202499992481656248059476354657492976181532449', '322024999924816562480594763546574929761815324', '49'],
    ['1425187681352534', '14251876813525', '34'],
    ['88341005', '883410', '05'],
    ['83754383091999185891636242478134745153231810595196', '837543830919991858916362424781347451532318105951', '96'],
    ['8234900186969819976585832', '82349001869698199765858', '32'],
    ['05500482983960006910', '055004829839600069', '10'],
    ['91617075914384200409098261870770716057567288711233', '916170759143842004090982618707707160575672887112', '33'],
    ['6796299606148920705318592491555408617318', '67962996061489207053185924915554086173', '18'],
    ['220873004452', '2208730044', '52'],
    ['44772502268842667819803075386076608493474082', '447725022688426678198030753860766084934740', '82'],
    ['3318821418190159927197892586292077116', '33188214181901599271978925862920771', '16'],
    ['54926955795055931', '549269557950559', '31'],
    ['53715523671212551268220445017640825', '537155236712125512682204450176408', '25'],
    ['3486151850507560', '34861518505075', '60'],
    ['4534390567499303478765964816486904115180420', '45343905674993034787659648164869041151804', '20'],
    ['5045', '50', '45'],
    ['50538', '505', '38'],
    ['24757759386709053366538274576210657', '247577593867090533665382745762106', '57'],
    ['664739816959376237603', '6647398169593762376', '03'],
    ['57328954582818893432177570432421382', '573289545828188934321775704324213', '82'],
    ['9928783114779426396', '99287831147794263', '96'],
    ['532321684688182512582223244973154476477', '5323216846881825125822232449731544764', '77'],
    ['5415158001410651645135', '54151580014106516451', '35'],
    ['9522471955129742660719940107487554745647293931', '95224719551297426607199401074875547456472939', '31'],
    ['7688152268150861398355895891785015272475484', '76881522681508613983558958917850152724754', '84'],
    ['5251025984651678242935958235723602978881668817290', '52510259846516782429359582357236029788816688172', '90'],
    ['668635896771227186', '6686358967712271', '86'],
    ['33535814206438295673952597955072364615413638204463', '335358142064382956739525979550723646154136382044', '63'],
    ['84803714597614333758042508756046777414160', '848037145976143337580425087560467774141', '60'],
    ['9383712649135706346215676273739372853', '93837126491357063462156762737393728', '53'],
    ['583', '5', '83'],
    ['60223227', '602232', '27'],
    ['6169641071917779935315194381377597396655', '61696410719177799353151943813775973966', '55'],
    ['12413031420611321089628086618847981677460935', '124130314206113210896280866188479816774609', '35'],
    ['3996387936315885601517965', '39963879363158856015179', '65'],
    ['13364044911383596506838564198535710903315924', '133640449113835965068385641985357109033159', '24'],
    ['741861982433243150', '7418619824332431', '50'],
    ['15056697701630831441199290151357280017446', '150566977016308314411992901513572800174', '46'],
    ['09996336', '099963', '36'],
    ['636219587159691142223', '6362195871596911422', '23'],
    ['6079660692771275027383551394922588248', '60796606927712750273835513949225882', '48'],
    ['8040806371396463463342342839621731406764', '80408063713964634633423428396217314067', '64'],
    ['00345073119702247280656743529519525501685', '003450731197022472806567435295195255016', '85'],
    ['43341475824506382', '433414758245063', '82'],
    ['5448457596983848111401941989219', '54484575969838481114019419892', '19'],
    ['649437987622935856848596613915883214', '6494379876229358568485966139158832', '14'],
    ['188944458', '1889444', '58'],
    ['915872477192478501024743568', '9158724771924785010247435', '68'],
    ['3656564733769602731893781070', '36565647337696027318937810', '70'],
    ['3290262443814145312548940968938137419589455', '32902624438141453125489409689381374195894', '55'],
    ['678613', '6786', '13'],
    ['91009481457601404483', '910094814576014044', '83'],
    ['412984353939015457569071224564254707046', '4129843539390154575690712245642547070', '46'],
    ['614772837870259653166506', '6147728378702596531665', '06'],
    ['234353', '2343', '53'],
    ['785265635', '7852656', '35'],
    ['9963425090164', '99634250901', '64'],
    ['9428745311315234524365538662485496444423841', '94287453113152345243655386624854964444238', '41'],
    ['439189512476121217915825110982942040225252757', '4391895124761212179158251109829420402252527', '57'],
    ['8390473061683877906811984034148432171318851724', '83904730616838779068119840341484321713188517', '24'],
    ['82359840141592910036647388591119831380', '823598401415929100366473885911198313', '80'],
    ['67615417742250521160651728422365980863986416766511', '676154177422505211606517284223659808639864167665', '11'],
    ['66688308656692246566783952163', '666883086566922465667839521', '63'],
    ['837486057361', '8374860573', '61'],
    ['31964181473517985429952827148895212338815475377', '319641814735179854299528271488952123388154753', '77'],
    ['67319', '673', '19'],
    ['81214689411669181583129707616492623062046973302', '812146894116691815831297076164926230620469733', '02'],
    ['485893985556054582616151312972', '4858939855560545826161513129', '72'],
    ['54141306213', '541413062', '13'],
    ['6536922703460567171901698577626', '65369227034605671719016985776', '26'],
    ['2939923919', '29399239', '19'],
    ['8778932599499000826589972747378738179', '87789325994990008265899727473787381', '79'],
    ['0988974486403569647517703', '09889744864035696475177', '03'],
    ['32725603941733029059194832378985608318671', '327256039417330290591948323789856083186', '71'],
    ['5023275195358139680', '50232751953581396', '80'],
    ['25909635623820020027126835611054558', '259096356238200200271268356110545', '58'],
    ['7010465484683976281626859101632157614512', '70104654846839762816268591016321576145', '12'],
    ['4154680254610947966797670670872', '41546802546109479667976706708', '72'],
    ['30767128640037830639233123051754816278285631064526', '307671286400378306392331230517548162782856310645', '26'],
    ['163050890', '1630508', '90'],
    ['19472686007025390720655906288082697429530696180625', '194726860070253907206559062880826974295306961806', '25'],
    ['409199848495819029196016069447', '4091998484958190291960160694', '47'],
    ['6258036789043', '62580367890', '43'],
    ['5918', '59', '18'],
    ['2062597776945548306', '20625977769455483', '06'],
    ['060898513041788720153047687', '0608985130417887201530476', '87'],
  ];

  const invalid = [
    '79445',
    '9798',
    '375868282343',
    '24317820961419409380062077592753287576818X',
    '527',
    '792771904069435967228097245176385',
    '88627197127522',
    '6902269130131263083529X',
    '548948203397832',
    '92278188838120847901658822118304',
    '5099618826379340',
    '1747262671211458110201622103678877239',
    '02',
    '55098604002668708754215526576042',
    '74620658663',
    '159521179712250340292933005',
    '29953359122780133312161008',
    '627',
    '08061723756127709906398238671897839848265',
    '452955151417708029877138472392778844235727085',
    '21847137946520359971708',
    '0538751174173578757178081335',
    '34006787406365897930532982800542X',
    '1884234835259X',
    '1399725010830022064763538027708',
    '7440371066898040923897712997187846943801609X',
    '96167659675255861786506786706595115528775527987',
    '234581646043348631613899365',
    '558180185497',
    '929529690572330321262335864734556436990507',
    '2009130735472544574324044536',
    '74266664424137226850037',
    '437593769228280',
    '067872007400858375576543403345862964874211',
    '463147452888439812397',
    '7397790739904600059789214703291257637420',
    '48411119',
    '483915609925237034346273149994897',
    '639646988774501',
    '165458918162838196818109879799744928106X',
    '05875703073',
    '484916283986790636503840',
    '225696912606223',
    '0601029037106410827693160373235210',
    '3335592762690253635',
    '8858420874',
    '8945902336',
    '329825407478794475469116761',
    '9762491703995333287288',
    '69',
    '0648127364712623',
    '453812707844593193817287791988349097',
    '1777337239101',
    '3113918324692093',
    '159985403753777615165588217024865118857649558400',
    '576896540272691080861758646002333538131',
    '537177903370',
    '39332',
    '75973735848435872240',
    '3115490387581284772073100670',
    '3986',
    '24774442961145964623',
    '616124195859452',
    '484781621036814963095558490971',
    '034379197280800761341729908955',
    '51471X',
    '8795676050525689297875330227',
    '170877653463827455619284858668913635370419348327',
    '8051',
    '50435912142265428349380597',
    '403415446040276944792533576146128052646',
    '338426048',
    '458584036879',
    '3227013102158562907',
    '73268427849085052596',
    '735967547197',
    '0600467057120899413',
    '006446878553661232922915768727',
    '79102413170191613309796',
    '963780971924844',
    '805427822',
    '6133449450',
    '90680632351691951470X',
    '901639440415555918579',
    '57891973968260748980',
    '33774359122351317682402029672632880993985762',
    '00365734252354116390143745',
    '44444137',
    '687994963483332950306659841X',
    '6444101594390287210851791366',
    '235996705176809420430167289130774875324336864',
    '7683733973300309',
    '760558056790670294606707490146165174',
    '346',
    '7849933816',
    '4492417439373965789354941658202623536050295933',
    '040194405307872903163789318450313467488',
    '8876721030352',
    '8362946652717815642633',
    '71643784796795476677112972226',
    '6163102486091',
    '02',
    '3746549034989825452',
    '4750823745965148410506860782865180',
    '6788851113290276340298849',
    '39243501904967319180709618190X',
    '116706974560603',
    '380528676775136521975',
    '3723818',
    '718',
    '788772215218241394402150316395351269',
    '79985853846094',
    '4685308187910775511935',
    '719974614965292594478091717011',
    '3866293379018',
    '2478937987974868054514',
    '5315836936510337498521152393637788549191117884',
    '27669485260885400847947465',
    '14317170501741463696116320513655',
    '787150456525702488',
    '30322325568169542626',
    '49219593989',
    '201374265339936758561261638732421935041440674234',
    '16046177521252',
    '6642227777335546758083475793816767104X',
    '06544534',
    '0683794524145961',
    '4315218904775887126',
  ];
  // }}}

  common.testAlgo(algo, valid, invalid);
});

// vim: fdm=marker fmr&
