const raw = `1089890105678121432132101232127321012354321
0178763234589030543045000345018018985467610
3298954103490347656106215496789123876508998
4567832234321258985287306784100034565012567
2356541025652767014396454993211239654523498
1403456710787854320478567884589748703012367
0512109876598941231569545675679856412721456
7657238102345410542349830901298764567810565
8998341201986789621056721850347543201998776
7087650345679878700876545765456670102367985
6121065436901263210980238750105985434451234
5432376327874354890121129653234356321010105
2345981210965568765430098544234067865430096
1296590210567809012321107230165123956721187
0187645323456918456789236109877034847810256
0099236012567823565018045234578765432901340
1678107101998894654327102198679896001076541
2363218900806765785210231087988587123189832
1454300210712567892104345896107698894898321
0510321345643498763569856745234565765765410
9621410478761098954478765030109874327656731
8734589569454167410349034121918969018549843
9435678400123256301256121030876878129450652
4521017312321343214787036980125561034321781
5670901205430456345698347898234432211289690
4989874396012387210510256723478934300478541
3090765487801091234423105410560125410367630
2101051234945670542394576321021076523458921
1672340545234987691087689987688987984361010
0589655676101296789079012896590868970154301
3438764985054385674108543003481078561567210
0127123078765676543287632112872369432018923
6546042129654778904398910001965454342129854
7237653434569865215897601223450569243036765
8198548521010764346710510319321678154545678
9011239630781453454323423408765321069694789
0100348749692354320345014503455430678783210
3217654458543765211276769612786726789698701
8348983267012891200989838764691810652189610
9456678101101010341234542123500901643076521
8764569434514567650765430054411898701103430
7623430127603498769876121069322345632212341
6510121098012389858789012378443454543303454`;

module.exports = raw.split('\n').map(i => i.split('').map(j => parseInt(j)));