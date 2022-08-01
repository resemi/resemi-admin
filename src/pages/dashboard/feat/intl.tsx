import React from 'react';
import { FormattedDate, FormattedMessage, FormattedNumber, FormattedPlural, useIntl } from 'react-intl';

export default function Page() {
  const intl = useIntl();
  return (
    <>
      <FormattedDate value={Date.now()} year="numeric" month="long" day="2-digit" />
      <br />
      <FormattedNumber value={2000} />
      <br />
      <FormattedPlural value={5} one="1 click" other="5 clicks" />
      <br />
      <input placeholder={intl.formatDate(Date.now())} />
      <h1>
        <FormattedMessage id="test1" />
      </h1>
      <p>
        <FormattedMessage id="test2" values={{ n: 59.99 }} />
      </p>
      <p>
        <FormattedMessage id="test3" values={{ n: 2000 }} />
      </p>
      <p>
        <FormattedMessage id="test4" values={{ d: new Date() }} />
      </p>
      <p>
        <FormattedMessage id="click_count" values={{ count: 1 }} />
      </p>
    </>
  );
}
