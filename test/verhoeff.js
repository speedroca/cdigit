const assert = require('assert').strict;
const cdigit = require('..');

describe('Verhoeff algorithm', () => {
  const name = 'verhoeff';
  const algo = cdigit[name];

  const valid = [
    ['236', '3'], ['7728635820', '7'], ['04931803', '7'], ['007517311', '0'],
    ['01024845', '5'], ['06568986', '2'], ['06479718', '7'], ['0202052', '3'],
    ['527035', '3'], ['01750233', '6'], ['009557265', '6'], ['08682273', '0'],
    ['2425089', '5'], ['8820375', '8'], ['6228694', '7'], ['005322797', '5'],
    ['7459117', '0'], ['009104556', '8'], ['04717249', '7'], ['002717051', '3'],
    ['09075696', '1'], ['04370338', '7'], ['01168676', '1'], ['2919413', '6'],
    ['01224799', '6'], ['005339970', '2'], ['04825408', '1'], ['6711810', '9'],
    ['9011851', '9'], ['004906597', '6'], ['04606554', '3'], ['0151723', '7'],
    ['03818633', '7'], ['009944956', '8'],
  ];

  const invalid = [
    ['236', '0'], ['236', '1'], ['236', '2'], ['236', '4'], ['236', '5'],
    ['236', '6'], ['236', '7'], ['236', '8'], ['236', '9'],
    ['00228883', '2'], ['6866000', '0'], ['8565988', '5'], ['0293732', '6'],
    ['3576801', '0'], ['04136644', '9'], ['0420654', '4'], ['002014421', '9'],
    ['1645150', '5'], ['003249561', '2'], ['5632161', '5'], ['04934896', '4'],
    ['02924190', '2'], ['2416374', '0'], ['0901786', '1'], ['004601776', '5'],
    ['04049758', '3'], ['3379093', '9'], ['01489667', '7'], ['3281840', '3'],
    ['04832177', '9'], ['0318463', '6'], ['03754040', '8'], ['7760252', '0'],
    ['06635773', '7'], ['02511903', '6'], ['03192825', '0'], ['001234146', '5'],
    ['130834', '4'], ['009070302', '9'], ['06588890', '7'], ['006164297', '0'],
  ];

  const large = [
    ['061960802258664759429926439424091240', '9'],
    ['75157117833317447053836915935892035', '9'],
    ['005936283426851152097824533391546647', '8'],
    ['041174888340227903040814500581563720', '7'],
    ['0041496808530355441289979105093108052', '1'],
    ['0098464835476311461221873897865355280', '7'],
    ['014965815920446659632413444296516086', '0'],
    ['0012425223950963994005750370737952695', '5'],
    ['57036543980689478484060809492514296', '2'],
    ['53009431303515431001031308796954270', '5'],
    ['0051127103853742860622122502528650090', '4'],
    ['009218166213534545647882886405991044', '7'],
    ['023970245936159858294941419206777984', '4'],
    ['00485002201183385678091214388748397', '2'],
    ['63203756067805721552611453981584366', '8'],
    ['072362376664550213123924793974247', '1'],
  ];

  describe(name + '.generate()', () => {
    it('generates a correct check digit', () => {
      for (const [num, checkdigit] of valid) {
        assert.equal(algo.generate(num), checkdigit, `${name}.generate(${num})`);
      }
    });

    it('accepts large decimal strings', () => {
      for (const [num, checkdigit] of large) {
        assert.equal(algo.generate(num), checkdigit, `${name}.generate(${num})`);
      }
    });
  });

  describe(name + '.validate()', () => {
    it('returns true if a code or a pair of number and check digit is valid', () => {
      for (const [num, checkdigit] of valid) {
        assert.ok(algo.validate(num + checkdigit), `${name}.validate(${num + checkdigit})`);
        assert.ok(algo.validate(num, checkdigit), `${name}.validate(${num}, ${checkdigit})`);
      }
    });
    it('returns false if a code or a pair of number and check digit is invalid', () => {
      for (const [num, checkdigit] of invalid) {
        assert.ok(!algo.validate(num + checkdigit), `!${name}.validate(${num + checkdigit})`);
        assert.ok(!algo.validate(num, checkdigit), `!${name}.validate(${num}, ${checkdigit})`);
      }
    });

    it('accepts large decimal strings', () => {
      for (const [num, checkdigit] of large) {
        assert.ok(algo.validate(num + checkdigit), `${name}.validate(${num + checkdigit})`);
        assert.ok(algo.validate(num, checkdigit), `${name}.validate(${num}, ${checkdigit})`);
      }
    });
  });

  describe(name + '.encode()', () => {
    it('appends a correct check digit to a number', () => {
      for (const [num, checkdigit] of valid) {
        assert.equal(algo.encode(num), num + checkdigit, `${name}.encode(${num})`);
      }
    });

    it('accepts large decimal strings', () => {
      for (const [num, checkdigit] of large) {
        assert.equal(algo.encode(num), num + checkdigit, `${name}.encode(${num})`);
      }
    });
  });

  describe(name + '.decode()', () => {
    it('separates the leading digits and the last digit', () => {
      for (const [num, checkdigit] of valid) {
        assert.deepEqual(algo.decode(num + checkdigit), [num, checkdigit], `${name}.decode(${num + checkdigit})`);
      }
    });
    it('accepts large decimal strings', () => {
      for (const [num, checkdigit] of large) {
        assert.deepEqual(algo.decode(num + checkdigit), [num, checkdigit], `${name}.decode(${num + checkdigit})`);
      }
    });
  });

  describe('bulk example test', () => {
    const examples = [
      '2363', '5357084', '69954516', '81335211', '44593650', '0049950638',
      '03896025', '0068716540', '0025701100', '58181453', '66476930',
      '60158862', '031950144', '076884255', '027119369', '46200920', '99390631',
      '23309489', '0052478848', '0075272466', '0022429632', '82671168',
      '25257216', '6204713', '0096880514', '0085591604', '0099719045',
      '84033346', '55019999', '24068703', '16072082', '059633257', '77908591',
      '090156671', '97063984', '039630056', '73132699', '012818089',
      '0037550877', '039180764', '050640092', '0013503619', '008152311',
      '0076970850', '059735434', '59927949', '0062617894', '3994053',
      '0041515823', '028035955', '0026902759', '043346511', '058307931',
      '005379201', '088748521', '045303743', '037986200', '94141754',
      '0044746127', '0037893182', '048112347', '001007449', '28957659',
      '70534852', '0043697584', '28345593', '0068947798', '0068186947',
      '047409719', '058079449', '08798054', '0027584523', '008760498',
      '005723856', '022728444', '6198089', '097573240', '80088936', '046478565',
      '48387817', '0096366066', '045766558', '087921639', '33029563',
      '007928987', '25136481', '0079785128', '67271824', '096873288',
      '0051034541', '76638436', '74406025', '56077139', '94780690',
      '0029350101', '010109963', '30388490', '079739588', '009479211',
      '0082839775', '096913209', '88776574', '0057514795', '30721109',
      '83170592', '43313999', '007048883', '051140200', '73940783',
      '0091891832', '49272239', '0068185128', '67617282', '65713108',
      '099946176', '0070716474', '02300297', '034150296', '010254002',
      '86779951', '086961859', '28995408', '38121883', '045117546', '02319886',
      '65649070', '0057979702', '0092484360', '74295647',
    ];

    it('applies the four functions to collected valid examples', () => {
      for (const e of examples) {
        const [num, checkdigit] = [e.slice(0, -1), e.slice(-1)];
        assert.equal(algo.generate(num), checkdigit, `${name}.generate(${num})`);
        assert.ok(algo.validate(e), `${name}.validate(${e})`);
        assert.ok(algo.validate(num, checkdigit), `${name}.validate(${num}, ${checkdigit})`);
        assert.equal(algo.encode(num), e, `${name}.encode(${num})`);
        assert.deepEqual(algo.decode(e), [num, checkdigit], `${name}.decode(${e})`);
      }
    });
  });

});