import PropTypes from "prop-types";
import { Card, Space, Statistic } from "antd";

const AreaCard = ({ icon, title, value, description }) => {
  return (
    <Card>
      <Space direction="horizontal" align="center">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
      <p>{description}</p>
    </Card>
  );
};

export default AreaCard;

AreaCard.propTypes = {
  icon: PropTypes.element, // icon là một React element
  title: PropTypes.string.isRequired, // tiêu đề
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // giá trị hiển thị
  description: PropTypes.string, // mô tả thêm
};
