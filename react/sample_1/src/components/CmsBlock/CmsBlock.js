import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CmsBlock.css';
import Loader from "../Loader";
import {compose} from "redux";
import {graphql} from "react-apollo";
import GetCmsBlockBySlug from "./getCmsBlockBySlug.graphql";
import {injectIntl} from "react-intl";

import _ from 'lodash';

class CmsBlock extends React.Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    CmsBlock: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      lang: 'en',
      region: 'us',
    };
  }

  getBlockContent() {
    let block = null;
    if(this.props.CmsBlock && this.props.CmsBlock.getCmsBlockBySlug) {
      let blocks = this.props.CmsBlock.getCmsBlockBySlug;

      block = _.findLast(blocks, (b) => {
        return b.lang == this.state.lang && b.region == this.state.region;
      });

      if(block) {
        return block.content;
      }

      block =_.findLast(blocks, (b) => {
        return b.lang == this.state.lang;
      });

      if(block) {
        return block.content;
      }

      if(blocks[0] && blocks[0].content) {
        return blocks[0].content;
      }

      return null;
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.CmsBlock && nextProps.CmsBlock.getCmsBlockBySlug && nextProps.CmsBlock.getCmsBlockBySlug.length > 0) {
      this.setState({ loading: false });
    }
    if(nextProps.intl && nextProps.intl.locale) {
      let i = nextProps.intl.locale.split('-');
      let lang = i[1].toLowerCase();
      let region = i[0].toLowerCase();
      this.setState({ lang: lang, region: region });
    }
  }

  render() {
    return (
      <div className={s.root}>
        {
          this.state.loading && <Loader type={"text"} />
        }
        {
          !this.state.loading && <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{__html: this.getBlockContent() }}
          />
        }
      </div>
    );
  }
}
export default compose(
  injectIntl,
  withStyles(s),
  graphql(GetCmsBlockBySlug, {
    name: 'CmsBlock',
    options: {
      ssr: false,
    }
  }),
)(CmsBlock);

