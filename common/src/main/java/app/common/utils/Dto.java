package app.common.utils;

import lombok.Data;

@Data
public class Dto<T> {
    private String msg;//消息
    private Boolean success = false;//调用是否成功
    private T dto;//需要传输的数据
}
