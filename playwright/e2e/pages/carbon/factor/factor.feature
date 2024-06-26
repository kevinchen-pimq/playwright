@carbon-factor
Feature: 碳盤查/排放源係數管理

  Scenario Outline: 測試資料 - 新增
    Given 點擊 手動新增 按鈕
    And 開啟 新增排放源 modal
    When 欄位 排放源 輸入 {downArrow}自來水
    * 選擇 臺北自來水 選項
    # 多做一個{downArrow}，讓下拉選單正常工作
    * 欄位 排放源 輸入 {downArrow}<name>{enter}
    * 欄位 公告年份 輸入 <year>
    * 欄位 公司名稱 輸入 <organization>
    # * 暫停
    # * 點擊 新增 按鈕
    # Then 列表 exist <organization>

    Examples:
      | name         | year | organization   |
      | 乾淨的煤     | 2023 | 川普           |
      | 辦公室用水   | 2020 | PIMQ           |
      | 自來水(test) | 2000 | 台灣自來水公司 |
