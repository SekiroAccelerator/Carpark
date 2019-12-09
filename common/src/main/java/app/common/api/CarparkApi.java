package app.common.api;

import app.common.pojo.Carpark;
import app.common.utils.Dto;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

public interface CarparkApi {
//    int deleteByPrimaryKey(Integer id);
//
//    int insert(Carpark record);
//
//    int insertSelective(Carpark record);
//
//    Carpark selectByPrimaryKey(Integer id);
//
//    int updateByPrimaryKeySelective(Carpark record);
//
//    int updateByPrimaryKey(Carpark record);

    /**
     * 停车场列表
     * @return
     */
    @RequestMapping("list")
    Dto<List<Carpark>> carparkList();
}